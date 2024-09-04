from flask import Blueprint, request, jsonify
import google.generativeai as genai
import os

# Configure the API key
API_KEY = "AIzaSyC6iqFmmBrHeAzOu4VSgO7SYCkNtmwCZM8"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def create_steps_blueprint(grievance_collection, upload_folder):
    steps_bp = Blueprint('steps', __name__)


    @steps_bp.route('/get_steps', methods=['POST'])
    def get_steps():
        data = request.json
        grievance_id = data.get('grievanceId')
        print(data)
        
        grievance = grievance_collection.find_one({"pnr": grievance_id})

        if not grievance:
            return jsonify({"error": "Grievance not found"}), 404

        description = grievance.get('grievanceDescription', '')
        file_path = grievance.get('file', '')

        # file_full_path = os.path.join(upload_folder, file_path)

        user_image_file = genai.upload_file(path=f'{file_path}')

        action_prompt = f"""This is the description of the complaint: {description}. Look at both the description and the image provided.
        Generate 3-4 concise, specific steps for staff to handle the complaint. Interpret the complaint from the image and the description.
        Include:
        1. Contacting to address the issue
        2. Specific action based on the complaint category:
        - If Uncleanliness: Include thorough cleaning steps
        - If Food-related: Mention food replacement or quality check
        - If Maintenance: Specify type of maintenance (plumbing/electrical/mechanical) based on the description
        - If Others: Provide a general inspection and resolution step
        3. Resolving the specific issue mentioned in the description
        4. Following up with the passenger
        5. Also tell to forward to the necessary station if the complaint cannot be resolved by him.
        Provide clear, actionable steps without using 'I' statements."""

        response = model.generate_content([user_image_file, action_prompt])

        actions_to_be_taken = response.text.strip()

        return jsonify({
            "description": description,
            "steps": actions_to_be_taken
        }), 200

    return steps_bp
