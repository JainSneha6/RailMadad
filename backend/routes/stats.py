from flask import Blueprint, jsonify

def create_stats_blueprint(grievance_collection):
    stats_bp = Blueprint('stats', __name__)

    @stats_bp.route('/grievance_count', methods=['GET'])
    def get_grievance_count():
        count = grievance_collection.count_documents({})
        return jsonify({"count": count}), 200

    @stats_bp.route('/grievance_stats', methods=['GET'])
    def get_grievance_stats():
        pipeline = [
            {"$group": {"_id": "$departmentType", "count": {"$sum": 1}}},
            {"$project": {"name": "$_id", "count": 1, "_id": 0}}
        ]
        departments = list(grievance_collection.aggregate(pipeline))
        
        pipeline = [
            {"$group": {"_id": "$departmentSubtype", "count": {"$sum": 1}}},
            {"$project": {"name": "$_id", "count": 1, "_id": 0}}
        ]
        subDepartments = list(grievance_collection.aggregate(pipeline))
        
        pipeline = [
            {"$group": {"_id": "$priority", "count": {"$sum": 1}}},
            {"$project": {"name": "$_id", "count": 1, "_id": 0}}
        ]
        priorities = list(grievance_collection.aggregate(pipeline))

        return jsonify({
            "departments": departments,
            "subDepartments": subDepartments,
            "priorities": priorities
        })

    return stats_bp
