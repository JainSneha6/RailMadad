# routes/complaint_routing.py

from flask import Blueprint, request, jsonify
import pandas as pd
import google.generativeai as genai
import re

# Configure the API key
API_KEY = "AIzaSyC6iqFmmBrHeAzOu4VSgO7SYCkNtmwCZM8"
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

def create_complaint_routing_blueprint(grievance_collection):
    bp = Blueprint('complaint_routing', __name__)

    # Sample station data - in practice, this might come from a database
    station_data = {
        'Station': [
            'New Delhi', 'Mumbai CST', 'Kolkata Howrah', 'Chennai Egmore', 'Bengaluru City',
            'Hyderabad Deccan', 'Jaipur', 'Lucknow', 'Ahmedabad', 'Kanpur Anwarganj',
            'Patna', 'Amritsar', 'Guwahati', 'Pune', 'Surat',
            'Agra Cantt', 'Varanasi', 'Bhubaneswar', 'Kochi', 'Coimbatore',
            'Indore', 'Udaipur', 'Jabalpur', 'Gwalior', 'Bhopal'
        ],
        'Station Master': [
            'Siddhartha Chakrabarty', 'Rajesh Kumar', 'Sanjay Sharma', 'Deepika Rani', 'Vikash Patel',
            'Kiran Kumar', 'Amitabh Yadav', 'Neeta Singh', 'Manoj Sharma', 'Ravi Kumar',
            'Sunil Gupta', 'Pooja Verma', 'Rohit Kumar', 'Shalini Mehta', 'Suresh Patel',
            'Priya Sinha', 'Ramesh Chandra', 'Nisha Gupta', 'Rajiv Soni', 'Anu Sharma',
            'Arun Kumar', 'Suman Kumari', 'Rajendra Singh', 'Kavita Sinha', 'Deepak Yadav'
        ]
    }

    station_df = pd.DataFrame(station_data)

    # Convert DataFrame to a string representation
    station_df_str = station_df.to_string(index=False)

    @bp.route('/send', methods=['POST'])
    def route_complaint():
        data = request.json
        step_response = data.get('stepDescription')
        grievance_pnr = data.get('grievancePNR')

        print(grievance_pnr)

        prompt = f"""
        This is the prompt from the TTE telling which station the complaint needs to be routed to :  {step_response}.
        Following is the dataframe containing the station names and the corresponding station master names : {station_df_str}.
        Give the name of the station master to whom the complaint needs to be routed.
        If complete name of station is not given, interpret it according to your understanding. But only give the name of the station master and nothing else.
        Give in this format : **Station_Master**.
        """

        response = model.generate_content(prompt)
        actions = response.text.strip()

        station_master = re.sub(r'\*', '', actions)

        
        try:
            result = grievance_collection.update_one(
                {"pnr": grievance_pnr},
                {"$set": {"station_master": station_master}}
            )

            if result.modified_count == 0:
                raise Exception("No documents matched the query.")

        except Exception as e:
            print(f"Error updating record in MongoDB: {e}")


        return jsonify({"station_master": station_master, "status": "success"})

    return bp
