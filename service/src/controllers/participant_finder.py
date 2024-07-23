from typing import Dict
import uuid

class ParticipantFinder:
    def __init__(self, participants_repository) -> None:
        self.participants_repository = participants_repository

    def find(self, tripId)->Dict:
        try:
            participants = self.participants_repository.find_participants_from_trip(tripId)
            participants_info = []
            for participant in participants:
                participants_info.append(
                    {
                        "id":participant[0],
                        "name":participant[1],
                        "is_confirmed":participant[2],
                        "email":participant[3],
                    }
                )
            return {
                "body": {"participants": participants_info, },
                "status_code": 200
                } 
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }