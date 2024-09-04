from flask import Blueprint, request, jsonify
import os
from datetime import datetime
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
import re

import csv

# Initialize Google Generative AI model
api_key = "AIzaSyC6iqFmmBrHeAzOu4VSgO7SYCkNtmwCZM8"  # Replace with your actual API key
llm = ChatGoogleGenerativeAI(api_key=api_key, model='gemini-pro')
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}



def create_grievance_blueprint(grievance_collection, upload_folder):
    grievance_bp = Blueprint('grievance', __name__)

    # Helper function to check allowed file types
    def allowed_file(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def load_train_details(csv_file):
        train_details = {}
        with open(csv_file, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                train_details[int(row["PNR"])] = {
                    'train': f'{row["Train Number"]}',
                    'coach': f'Coach {row["Coach"]}',
                    'seat': f'Seat {row["Seat Number"]}'
                }
        return train_details

    def load_types_and_subtypes(csv_file):
        types_and_subtypes = {}
        with open(csv_file, mode='r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                grievance_type = row['Type']
                subtype = row['SubType']
                priority = int(row['Priority'])  

                if grievance_type not in types_and_subtypes:
                    types_and_subtypes[grievance_type] = []

                types_and_subtypes[grievance_type].append({
                    'subtype': subtype,
                    'priority': priority
                })
        return types_and_subtypes

    train_details_dict = load_train_details('datasets/pnr_seat_coach_trainmapping_Generated_dataset.csv')
    types_and_subtypes_dict = load_types_and_subtypes('datasets/TrainGrievances.csv')

    def pnr_to_details(pnr):
        pnr = int(pnr)
        details = train_details_dict.get(pnr)

        if not details:
            return {
                'train': 'Train Unknown',
                'coach': 'Coach Unknown',
                'seat': 'Seat Unknown'
            }

        return details

    def insert_grievance_to_mongo(data, trainNo, train_details, priority, department_type, department_subtype, file_path=None):
        grievance_data = {
            "incidentDate": data.get("incidentDate"),
            "file": file_path,
            "grievanceDescription": data.get("grievanceDescription"),
            "pnr": data.get("pnr"),
            
            "trainNo": trainNo,
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude"),
            "train_details": train_details,
            "departmentType": department_type,  
            "departmentSubtype": department_subtype,  
            "priority": priority,  
            "submitted_at": datetime.utcnow()
        }

        result = grievance_collection.insert_one(grievance_data)
        return result.inserted_id

    def image_response(img_name):
        user_image_file = genai.upload_file(path=f'{img_name}')
        response = model.generate_content([user_image_file, "Describe the issue depicted in the train-related image"])
        return response.text.strip()

    prompt_template = """
    Based on the provided grievance description and the attached file, map the grievance to its appropriate type and subtype.
    Grievance Description: {grievance_description}
    Image Description: {image_description}
    Types and Subtypes: {types_and_subtypes}
    Provide the response in the following format:
    - Department Type: [Type]
    - Department Subtype: [Subtype]
    """

    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["grievance_description", "image_description", "types_and_subtypes"]
    )

    chain = LLMChain(
        llm=llm,
        prompt=prompt
    )

    def parse_gemini_response(response_text):
        
        type_match = re.search(r'- Department Type:\s*(.*)', response_text)
        subtype_match = re.search(r'- Department Subtype:\s*(.*)', response_text)
        
        department_type = type_match.group(1) if type_match else "Unknown"
        department_subtype = subtype_match.group(1) if subtype_match else "Unknown"
        
        return department_type, department_subtype

    @grievance_bp.route('/submit', methods=['POST'])
    def submit_grievance():
        file = request.files.get('file')
        
        if file and allowed_file(file.filename):
            filename = file.filename
            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)
        else:
            file_path = None

        data = request.form.to_dict()
        
        pnr = request.form.get('pnr')
        if pnr:
            train_details = pnr_to_details(pnr)
        else:
            train_details = {
                    'train': 'Train Unknown',
                    'coach': 'Coach Unknown',
                    'seat': 'Seat Unknown'
            }
        
        trainNo = train_details['train']

        image_description = image_response(file_path)
        response_text = chain.run(
            grievance_description=data.get("grievanceDescription"),
            image_description=image_description,
            types_and_subtypes=types_and_subtypes_dict
        )

        department_type, department_subtype = parse_gemini_response(response_text)

        priority = 3
        subtypes = types_and_subtypes_dict.get(department_type, [])
        for entry in subtypes:
            if entry['subtype'] == department_subtype:
                priority = entry['priority']
                break

        grievance_id = insert_grievance_to_mongo(data, trainNo,train_details, priority, department_type, department_subtype, file_path)

        response = {
            "message": "Grievance submitted successfully!",
            "data": data,
            "train_details": train_details,
            "grievance_id": str(grievance_id),
            "departmentType": department_type,
            "departmentSubtype": department_subtype,
            "priority": priority  
        }

        return jsonify(response), 200
    
    @grievance_bp.route('/complaints_by_train', methods=['GET'])
    def get_complaints_by_train():
        trainNo = request.args.get('trainNo')
        print(trainNo)

        if not trainNo:
            return jsonify({"error": "Train number is required"}), 400
        
        # Find grievances with the given train number
        complaints = grievance_collection.find({"trainNo": trainNo})

        print(complaints)
        
        # Convert the cursor to a list of dictionaries
        complaints_list = []
        for complaint in complaints:
            complaint_data = {
                "incidentDate": complaint.get("incidentDate"),
                "file": complaint.get("file"),
                "grievanceDescription": complaint.get("grievanceDescription"),
                "pnr": complaint.get("pnr"),
                "trainNo": complaint.get("trainNo"),
                "latitude": complaint.get("latitude"),
                "longitude": complaint.get("longitude"),
                "train_details": complaint.get("train_details"),
                "departmentType": complaint.get("departmentType"),
                "departmentSubtype": complaint.get("departmentSubtype"),
                "priority": complaint.get("priority"),
                "submitted_at": complaint.get("submitted_at")
            }
            complaints_list.append(complaint_data)

            print(complaints_list)
        
        return jsonify({"complaints": complaints_list}), 200

    @grievance_bp.route('/complaints_by_station', methods=['GET'])
    def get_complaints_by_station():
        station_master = request.args.get('station_master')

        if not station_master:
            return jsonify({"error": "Station name is required"}), 400

        # Find grievances related to the given station
        complaints = grievance_collection.find({"station_master": station_master})

        # Convert the cursor to a list of dictionaries
        complaints_list = []
        for complaint in complaints:
            complaint_data = {
                "incidentDate": complaint.get("incidentDate"),
                "file": complaint.get("file"),
                "grievanceDescription": complaint.get("grievanceDescription"),
                "pnr": complaint.get("pnr"),
                "trainNo": complaint.get("trainNo"),
                "latitude": complaint.get("latitude"),
                "longitude": complaint.get("longitude"),
                "train_details": complaint.get("train_details"),
                "departmentType": complaint.get("departmentType"),
                "departmentSubtype": complaint.get("departmentSubtype"),
                "priority": complaint.get("priority"),
                "submitted_at": complaint.get("submitted_at")
            }
            complaints_list.append(complaint_data)
        
        return jsonify({"complaints": complaints_list}), 200


    return grievance_bp

    