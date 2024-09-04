from flask import Blueprint, request, jsonify
import pandas as pd

def create_admin_blueprint(admin_collection):
    admin_bp = Blueprint('admin', __name__)

    tte_df = pd.read_csv('datasets/tte.csv')

    @admin_bp.route('/login', methods=['POST'])
    def admin_login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        admin = admin_collection.find_one({"username": username})

        if admin and password == admin['password']:  
            response = {"message": "Login successful!", "status": "success"}
        else:
            response = {"message": "Invalid credentials.", "status": "failure"}
        
        return jsonify(response), 200

    @admin_bp.route('/tte_login', methods=['POST'])
    def tte_login():
        data = request.get_json()
        tte_name = data.get('name')
        
        # Find the train number associated with the TTE name
        tte_entry = tte_df[tte_df['TTE'] == tte_name]

        print(tte_entry)
        
        if not tte_entry.empty:
            train_no = int(tte_entry.iloc[0]['TrainNo'])
            response = {"status": "success", "trainNo": train_no}
        else:
            response = {"status": "error", "message": "TTE not found"}
        
        return jsonify(response), 200

    return admin_bp

    
