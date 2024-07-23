from typing import Dict
import uuid
from src.drivers.email_sender import send_email 

class TripCreator:
    def __init__(self, trip_repository, email_repository, participants_repository) -> None:
        self.trip_repository = trip_repository
        self.email_repository = email_repository
        self.participants_repository = participants_repository

    def create(self, body)->Dict:
        try:
            emails = body.get("emails_to_invite")
            print("Emails: ", emails)
            print("Body: ", body)

            trip_id = str(uuid.uuid4())
            email_id = str(uuid.uuid4())
            trip_info = {**body, "id":trip_id}

            self.trip_repository.create_trip(trip_info)

            

            if emails:
                for email in emails:
                    self.email_repository.registry_email({
                        "email":email,
                        "trip_id":trip_id,
                        "id":email_id
                    })
                    self.participants_repository.registry_participants({
                        "id":str(uuid.uuid4()),
                        "trip_id":trip_id,
                        'emails_to_invite_id':email_id,
                        'name':""
                    })

            #send_email([body["owner_email"]], 
            #           f"http://localhost:3000/trips/{trip_id}/confirm"
            #           )

            return{
                "body":{"id": trip_id},
                "status_code":201
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
