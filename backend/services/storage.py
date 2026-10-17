import json
import os
from config import Config

def get_file_path(filename):
    os.makedirs(Config.DATA_DIR, exist_ok=True)
    file_path = os.path.join(Config.DATA_DIR, filename)
    if not os.path.exists(file_path):
        with open(file_path, 'w') as f:
            json.dump([], f)
    return file_path

def load_data(filename):
    with open(get_file_path(filename), 'r') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_data(filename, data):
    with open(get_file_path(filename), 'w') as f:
        json.dump(data, f, indent=4)