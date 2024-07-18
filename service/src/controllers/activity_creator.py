import uuid
from typing import Dict

class ActivityCreator:
    def __init__(self, activities_repository) -> None:
        self.activities_repository = activities_repository
    def create(self, body, trip_id)->Dict:
        try:
            id = str(uuid.uuid4())
            activity_info={
                "id": id,
                "trip_id": trip_id,
                "title":body["title"],
                "occurs_at":body['occurs_at']
            }

            self.activities_repository.registry_activity(activity_info)
            return{
                'body': {"activity_id": id},
                'status_code': 201
            }

        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }