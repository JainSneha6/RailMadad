from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pymongo import MongoClient
import csv
from datetime import datetime
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
import re

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

client = MongoClient("mongodb+srv://jainsnehasj6:6T9znFXUJZ3rplpi@railmadad.z17a9.mongodb.net/")
db = client['train_grievances']
grievance_collection = db['grievances']

api_key = "AIzaSyC6iqFmmBrHeAzOu4VSgO7SYCkNtmwCZM8"
llm = ChatGoogleGenerativeAI(api_key=api_key, model='gemini-pro')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_train_details(csv_file):
    train_details = {}
    with open(csv_file, mode='r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            train_details[int(row["PNR"])] = {
                'train': f'Train {row["Train Number"]}',
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

train_details_dict = load_train_details('pnr_seat_coach_trainmapping_Generated_dataset.csv')
types_and_subtypes_dict = load_types_and_subtypes('TrainGrievances.csv')

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

def insert_grievance_to_mongo(data, train_details, priority, file_path=None):
    grievance_data = {
        "mobileNo": data.get("mobileNo"),
        "journeyType": data.get("journeyType"),
        "incidentDate": data.get("incidentDate"),
        "file": file_path,
        "grievanceDescription": data.get("grievanceDescription"),
        "pnr": data.get("pnr"),
        "uts": data.get("uts"),
        "trainNo": data.get("trainNo"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "train_details": train_details,
        "priority": priority,  # Include priority in MongoDB document
        "submitted_at": datetime.utcnow()
    }

    result = grievance_collection.insert_one(grievance_data)
    return result.inserted_id

# Updated prompt template
prompt_template = """
Based on the provided grievance description and the attached file, map the grievance to its appropriate type and subtype.
Grievance Description: {grievance_description}
Attached File: {file_path}
Types and Subtypes: {types_and_subtypes}
Provide the response in the following format:
- Department Type: [Type]
- Department Subtype: [Subtype]
"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["grievance_description", "file_path", "types_and_subtypes"]
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

@app.route('/submit_grievance', methods=['POST'])
def submit_grievance():
    file = request.files.get('file')  # Use .get() to avoid KeyError
    
    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
    else:
        file_path = None

    data = request.form.to_dict()
    journey_type = request.form.get('journeyType')

    if journey_type == 'PNR':
        pnr = request.form.get('pnr')
        if pnr:
            train_details = pnr_to_details(pnr)
        else:
            train_details = {
                'train': 'Train Unknown',
                'coach': 'Coach Unknown',
                'seat': 'Seat Unknown'
            }
    else:
        train_details = {
            'train': request.form.get('trainNo', 'N/A'),
            'coach': 'N/A',
            'seat': 'N/A'
        }

    response_text = chain.run(
        grievance_description=data.get("grievanceDescription"),
        file_path=file_path,
        types_and_subtypes=types_and_subtypes_dict
    )

    department_type, department_subtype = parse_gemini_response(response_text)

    # Retrieve the priority level for the identified type and subtype
    priority = 3  # Default priority
    subtypes = types_and_subtypes_dict.get(department_type, [])
    for entry in subtypes:
        if entry['subtype'] == department_subtype:
            priority = entry['priority']
            break

    grievance_id = insert_grievance_to_mongo(data, train_details, priority, file_path)

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

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
