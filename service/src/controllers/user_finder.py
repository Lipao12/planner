from typing import Dict

class UserFinder:
    def __init__(self, users_repository, ) -> None:
        self.users_repository = users_repository
    
    def find_user_detail(self, user_id)->Dict:
        user = self.users_repository.find_user_by_id(user_id)
        if not user:
            raise Exception("No trip found.")
        try:
            return{
                "body":{
                    "user":{
                        "id": user[0],
                        "email": user[1],
                        "name": user[2],
                    }
                },
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
    