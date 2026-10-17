from functools import wraps
from flask import request, jsonify
import jwt
from config import Config

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        try:
            token = token.split(" ")[1] # Remove 'Bearer '
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            request.user = data
        except Exception:
            return jsonify({'error': 'Token is invalid or expired'}), 401
        return f(*args, **kwargs)
    return decorated