from flask import Blueprint, request, jsonify
from middleware.auth_middleware import token_required
from services.donation_service import create_donation, claim_donation
from services.matching_service import get_active_feed

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/', methods=['GET'])
def get_feed():
    return jsonify(get_active_feed()), 200

@donations_bp.route('/', methods=['POST'])
@token_required
def add_donation():
    if request.user['role'] != 'donor':
        return jsonify({"error": "Unauthorized"}), 403
    item = create_donation(request.json, request.user['user_id'])
    return jsonify(item), 201

@donations_bp.route('/<donation_id>/claim', methods=['POST'])
@token_required
def claim(donation_id):
    if request.user['role'] != 'ngo':
        return jsonify({"error": "Only NGOs can claim"}), 403
    try:
        updated = claim_donation(donation_id, request.user['user_id'])
        return jsonify(updated), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 409
    except KeyError:
        return jsonify({"error": "Not found"}), 404