import requests

subdomains = [
    "airticket-backend",
    "airticket-backend-kabish20",
    "goimomi-airline-hotel-backend",
    "goimomi-airline-hotel-airticket-backend",
    "goimomi-airline-hotel-api",
    "goimomi-airline-hotel-server",
    "goimomi-airline-hotel",
    "goimomi-airline-hotel-web",
]

for sub in subdomains:
    url = f"https://{sub}.onrender.com/api/booking/TJ1189178071008/"
    try:
        response = requests.get(url, timeout=5)
        routing = response.headers.get("x-render-routing", "found")
        print(f"{sub}: status={response.status_code}, routing={routing}")
    except Exception as e:
        print(f"{sub}: failed {e}")
