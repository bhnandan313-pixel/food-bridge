import uuid
from datetime import datetime
from .storage import load_data, save_data

def create_donation(data, donor_id):
    donations = load_data('donations.json')
    new_donation = {
        "id": str(uuid.uuid4()),
        "donor_id": donor_id,
        "title": data.get('title'),
        "quantity": data.get('quantity'),
        "type": data.get('type', 'Prepared Meals'),
        "isVeg": data.get('isVeg', True),
        "expiry": data.get('expiry'),
        "status": "available",
        "created_at": datetime.utcnow().isoformat(),
        "address": data.get('address', ''),
        "notes": data.get('notes', '')
    }
    donations.append(new_donation)
    save_data('donations.json', donations)
    return new_donation

def claim_donation(donation_id, ngo_id):
    donations = load_data('donations.json')
    for d in donations:
        if str(d.get('id')) == str(donation_id):
            current_status = str(d.get('status', '')).lower()
            if current_status != 'available':
                raise ValueError("Item no longer available")
            d['status'] = 'claimed'
            d['claimed_by'] = ngo_id
            d['claimed_at'] = datetime.utcnow().isoformat()
            save_data('donations.json', donations)
            return d
    raise KeyError("Donation not found")