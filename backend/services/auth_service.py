import uuid
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config
from .storage import load_data, save_data

def register_user(data):
    users = load_data('users.json')
    email = data.get('email', '').strip().lower()
    
    if any(u.get('email', '').lower() == email for u in users):
        raise ValueError("User already exists")
    
    new_user = {
        "id": str(uuid.uuid4()),
        "name": data.get('name'),
        "email": email,
        "password": generate_password_hash(data.get('password', '')),
        "role": data.get('role', 'donor')
    }
    users.append(new_user)
    save_data('users.json', users)
    return {"id": new_user["id"], "name": new_user["name"], "email": new_user["email"], "role": new_user["role"]}

def login_user(email, password):
    users = load_data('users.json')
    email_clean = (email or '').strip().lower()
    user = next((u for u in users if u.get('email', '').lower() == email_clean), None)
    
    # If not in users or no hashed password (e.g. initial demo login), allow demo login or verify hash
    if not user:
        # Auto-create demo user if valid email
        if email_clean and password:
            role = 'ngo' if 'ngo' in email_clean else 'donor'
            name = email_clean.split('@')[0].capitalize()
            user = {
                "id": str(uuid.uuid4()),
                "name": name,
                "email": email_clean,
                "password": generate_password_hash(password),
                "role": role
            }
            users.append(user)
            save_data('users.json', users)
        else:
            raise ValueError("Invalid credentials")
    else:
        # Check password if present
        if 'password' in user and not check_password_hash(user['password'], password):
            raise ValueError("Invalid credentials")
        
    token = jwt.encode({
        'user_id': user['id'],
        'role': user['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, Config.SECRET_KEY, algorithm="HS256")
    
    return {
        "token": token,
        "user": {
            "id": user["id"],
            "name": user.get("name", "User"),
            "email": user.get("email"),
            "role": user.get("role", "donor")
        }
    }