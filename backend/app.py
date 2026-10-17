from flask import Flask
from flask_cors import CORS
from config import Config

from routes.auth import auth_bp
from routes.donations import donations_bp
from routes.users import users_bp
from routes.activity import activity_bp

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",                          # local dev
    "https://foodbridge-frontend.onrender.com",       # Render production
    "*"                                               # fallback (tighten after deploy)
])

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(donations_bp, url_prefix='/api/donations')
app.register_blueprint(users_bp, url_prefix='/api/users')
app.register_blueprint(activity_bp, url_prefix='/api/activity')

@app.route('/health', methods=['GET'])
def health():
    return {"status": "ok"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=Config.PORT, debug=True)