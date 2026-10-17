from datetime import datetime
from .storage import load_data

def get_active_feed():
    donations = load_data('donations.json')
    users = load_data('users.json')
    user_map = {str(u.get('id')): u for u in users}
    
    now = datetime.utcnow().isoformat()
    active = []
    
    for d in donations:
        status = str(d.get('status', '')).lower()
        expiry = d.get('expiry') or d.get('expires_at') or '9999'
        
        # Filter available
        if status == 'available':
            donor = user_map.get(str(d.get('donor_id')), {})
            donor_name = donor.get('name') or d.get('donor') or 'Community Donor'
            donor_address = d.get('pickup_location') or donor.get('address') or 'Bengaluru'
            
            title = d.get('title') or d.get('food_item') or 'Surplus Food'
            quantity = d.get('quantity') or d.get('serving_capacity') or 10
            is_veg = d.get('isVeg') if 'isVeg' in d else (d.get('food_type') == 'Veg')
            
            active.append({
                **d,
                "id": str(d.get('id')),
                "title": title,
                "quantity": quantity,
                "expiry": expiry,
                "isVeg": is_veg,
                "status": "available",
                "donor": donor_name,
                "donor_id": d.get('donor_id'),
                "distance": d.get('distance', '1.2 km'),
                "type": d.get('type') or d.get('category') or 'Prepared Meals',
                "address": donor_address
            })
            
    active.sort(key=lambda x: x.get('expiry', '9999'))
    return active