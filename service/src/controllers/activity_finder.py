from datetime import datetime, timedelta
from typing import Dict
import uuid

class ActivityFinder:
    def __init__(self, activities_repository, trips_repository) -> None:
        self.activities_repository = activities_repository
        self.trips_repository = trips_repository

    def find(self, tripId)->Dict:
        try:
            activities = self.activities_repository.find_activities_from_trip(tripId)

            trip = self.trips_repository.find_trip_by_id(tripId)
            if not trip:
                return {
                    "body": {"error": "Trip not found"},
                    "status_code": 404
                }
            trip_start = trip[2]
            trip_end = trip[3]
            difference_in_days = (trip_end - trip_start).days
            activities_info = []
            for i in range(difference_in_days + 1):
                date = trip_start + timedelta(days=i)
                day_activities = [
                    {
                        "id": activity[0],
                        "title": activity[2],
                        "occurs_at": activity[3].isoformat(),
                    } for activity in activities if activity[3].date() == date.date()
                ]
                
                activities_info.append({
                    "date": date.date().isoformat(),
                    "activities": day_activities
                })
            return {
                "body": {"activities": activities_info, },
                "status_code": 200
                } 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }