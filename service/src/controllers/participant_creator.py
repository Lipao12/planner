import uuid
from typing import Dict

class ParticipantCreator:
    def __init__(self, participants_repository, emails_repository) -> None:
        self.participants_repository =participants_repository
        self.emails_repository = emails_repository

    def create(self, body, trip_id)->Dict:
        try:
            participant_id = str(uuid.uuid4())
            email_id = str(uuid.uuid4())

            email_info={
                "email":body['email'],
                "id":email_id,
                "trip_id":trip_id,
            }

            participant_info={
                "id":participant_id,
                "trip_id":trip_id,
                "emails_to_invite_id": email_id,
                "name": body['name']
            }

            self.emails_repository.registry_email(email_info)
            self.participants_repository.registry_participants(participant_info)

            return{
                'body': {"participant_id": participant_id},
                'status_code': 201
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }