import requests

url = "https://goimomi-airline-hotel-backend.onrender.com/api/booking/save/"
try:
    response = requests.post(url, json={})
    print("Status:", response.status_code)
    print("Headers:", dict(response.headers))
    print("Content preview:", response.text[:500])
except Exception as e:
    print("Error:", e)
