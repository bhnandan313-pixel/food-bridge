import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret')
    PORT = int(os.getenv('PORT', 5000))
    DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')