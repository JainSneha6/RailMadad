from flask import Flask
from flask_cors import CORS
import os
from pymongo import MongoClient

# Initialize Flask app
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize MongoDB client
client = MongoClient("mongodb+srv://jainsnehasj6:6T9znFXUJZ3rplpi@railmadad.z17a9.mongodb.net/")
db = client['train_grievances']
grievance_collection = db['grievances']
admin_collection = db['admins']

# Helper function to check allowed file types
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Import and register Blueprints after initializing all dependencies
from routes.admin import create_admin_blueprint
from routes.grievance import create_grievance_blueprint
from routes.stats import create_stats_blueprint
from routes.complaint_routing import create_complaint_routing_blueprint
from routes.steps_route import create_steps_blueprint

admin_bp = create_admin_blueprint(admin_collection)
grievance_bp = create_grievance_blueprint(grievance_collection, app.config['UPLOAD_FOLDER'])
stats_bp = create_stats_blueprint(grievance_collection)
complaint_routing_bp = create_complaint_routing_blueprint(grievance_collection)
steps_bp = create_steps_blueprint(grievance_collection, app.config['UPLOAD_FOLDER'])

app.register_blueprint(admin_bp, url_prefix='/admin')
app.register_blueprint(grievance_bp, url_prefix='/grievance')
app.register_blueprint(stats_bp, url_prefix='/stats')
app.register_blueprint(complaint_routing_bp, url_prefix='/complaint_routing')
app.register_blueprint(steps_bp, url_prefix='/steps')

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
