import requests

subdomains = [
    "goimomi-airticket-backend",
    "goimomi-airline-backend",
    "goimomi-airticket",
    "goimomi-backend",
    "airticket-backend-goimomi-airline-hotel",
    "airticket-backend-goimomi",
    "airticket-goimomi",
    "goimomi",
    "kabish20-goimomi-airline-hotel",
    "kabish20-airticket-backend",
    "airticket-backend-kabish",
    "goimomi-airline-hotel-airticket",
    "goimomi-airline-hotel-api-backend",
    "goimomi-airline-hotel-django",
]

for sub in subdomains:
    url = f"https://{sub}.onrender.com/api/booking/TJ1189178071008/"
    try:
        response = requests.get(url, timeout=5)
        routing = response.headers.get("x-render-routing", "found")
        print(f"{sub}: status={response.status_code}, routing={routing}")
    except Exception as e:
        print(f"{sub}: failed {e}")
