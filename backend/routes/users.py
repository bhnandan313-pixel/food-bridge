from flask import Blueprint, jsonify, request
from middleware.auth_middleware import token_required
from services.storage import load_data

users_bp = Blueprint('users', __name__)

@users_bp.route('/me', methods=['GET'])
@token_required
def get_profile():
    users = load_data('users.json')
    user = next((u for u in users if u['id'] == request.user['user_id']), None)
    if user:
        user.pop('password', None)
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404