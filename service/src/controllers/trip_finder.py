from typing import Dict

class TripFinder:
    def __init__(self, trips_repository) -> None:
        self.trips_repository = trips_repository

    def find_trip_detail(self, trip_id)->Dict:
        trip = self.trips_repository.find_trip_by_id(trip_id)
        if not trip:
            raise Exception("No trip found.")
        try:
            return{
                "body":{
                    "trip":{
                        "id": trip[0],
                        "destination": trip[1],
                        "starts_at": trip[2],
                        "ends_at": trip[3],
                        "status": trip[6],
                    }
                },
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
        
    def find_trips_by_user_id(self, user_id)->Dict:
        try:
            trips = self.trips_repository.find_trips_from_user(user_id)
            trips_info=[]
            for trip in trips:
                trips_info.append({
                    "id":trip[0],
                    "destination":trip[1],
                    "start_date":trip[2],
                    "end_date":trip[3],
                })
            return{
                "body":{
                    "trips":trips_info,
                },
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
