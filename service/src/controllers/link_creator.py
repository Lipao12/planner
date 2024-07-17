from typing import Dict
import uuid
from urllib.parse import urlparse

class LinkCreator:
    def __init__(self, link_resotirory) -> None:
        self.link_resotirory = link_resotirory

    def create(self, body, trip_id)->Dict:
        try:
            link_id = str(uuid.uuid4())
            url = body.get("link")
            # Verifica se a URL já possui um esquema (http:// ou https://)
            parsed_url = urlparse(url)
            if not parsed_url.scheme:
                url = f"http://{url}/" 

            link_info = {
                **body,
                "id":link_id,
                "trip_id":trip_id,
                "link": url,
            }
            self.link_resotirory.register_link(link_info)
            return {
                "body": {"linkId": link_id, },
                "status_code": 201
                } 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }