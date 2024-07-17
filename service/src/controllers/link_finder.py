from typing import Dict
import uuid

class LinkFinder:
    def __init__(self, link_resotirory) -> None:
        self.link_resotirory = link_resotirory

    def find(self, tripId):
        try:
            links = self.link_resotirory.find_link_from_trip(tripId)

            formatted_link=[]
            for link in links:
                formatted_link.append({
                    "id":link[0],
                    "link":link[2],
                    "title":link[3]
                })
            return {
                "body": {"links": formatted_link, },
                "status_code": 200
                } 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }