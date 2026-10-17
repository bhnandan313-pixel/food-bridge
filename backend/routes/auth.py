from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        user = register_user(request.json)
        return jsonify(user), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        result = login_user(data.get('email'), data.get('password'))
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401