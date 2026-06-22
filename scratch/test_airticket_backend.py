import requests

url = "https://airticket-backend.onrender.com/api/booking/TJ1189178071008/"
print("Sending GET request to:", url)
try:
    response = requests.get(url, timeout=60)
    print("Status Code:", response.status_code)
    print("Response Headers:", dict(response.headers))
    print("Response JSON:", response.json() if response.status_code == 200 else response.text)
except Exception as e:
    print("Request failed:", e)
