import requests
while(True):
    print(requests.get("http://localhost:2333/file.txt").text)