import requests

base_url = "https://gitlab.igem.org/api/v4/{}"

def getPrivateToken():
    url = base_url.format("version")
    r = requests.get(url)
    item = r.json()
    print(item)


if __name__ == "__main__":
    getPrivateToken()