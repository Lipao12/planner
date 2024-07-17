from typing import Dict

class TripUpdater:
    def __init__(self, trips_repository) -> None:
        self.trips_repository = trips_repository

    def update_trip_detail(self, body, trip_id: str)->Dict:
        try:
            print(body)
            self.trips_repository.update_trip_destination_and_date(trip_id, body["destination"], 
                                                     body["start_date"], 
                                                     body["end_date"])
            return {"body": None,"status_code": 204} 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
