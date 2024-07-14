from typing import Dict

class TripConfirmer:
    def __init__(self, trip_resotirory) -> None:
        self.trip_resotirory = trip_resotirory

    def confirm(self, trip_id)->Dict:
        try:
            self.trip_resotirory.update_trip_status(trip_id)
            return {"body": None,"status_code": 204} 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }