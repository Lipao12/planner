from typing import Dict
import uuid

class TripCreator:
    def __init__(self, trip_repository, email_repository) -> None:
        self.trip_repository = trip_repository
        self.email_repository = email_repository

    def create(self, body)->Dict:
        try:
            emails = body.get("email_to_invite")

            trip_id = str(uuid.uuid4())
            trip_info = {**body, "id":trip_id}

            self.trip_repository.create_trip(trip_info)

            if emails:
                for email in emails:
                    self.email_repository.registry_email({
                        "email":email,
                        "trip_id":trip_id,
                        "id":str(uuid.uuid4())
                    })
            return{
                "body":{"id": trip_id},
                "status_code":201
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
