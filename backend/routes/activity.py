from flask import Blueprint, jsonify, request
from middleware.auth_middleware import token_required
from services.storage import load_data

activity_bp = Blueprint('activity', __name__)

@activity_bp.route('/', methods=['GET'])
@token_required
def get_activity():
    donations = load_data('donations.json')
    user_id = str(request.user['user_id'])
    role = request.user['role']
    
    if role == 'donor':
        history = [d for d in donations if str(d.get('donor_id')) == user_id]
    else:
        history = [d for d in donations if str(d.get('claimed_by')) == user_id]
        
    return jsonify(history), 200