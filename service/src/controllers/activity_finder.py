from typing import Dict
import uuid

class ActivityFinder:
    def __init__(self, activities_repository) -> None:
        self.activities_repository = activities_repository

    def find(self, tripId)->Dict:
        try:
            activities = self.activities_repository.find_activities_from_trip(tripId)
            activities_info = []
            for activity in activities:
                activities_info.append(
                    {
                        "id":activity[0],
                        "title":activity[2],
                        "occurs_at":activity[3],
                    }
                )
            return {
                "body": {"activities": activities_info, },
                "status_code": 200
                } 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }