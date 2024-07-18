from typing import Dict

class UserLogin:
    def __init__(self, users_repository, ) -> None:
        self.users_repository = users_repository
    
    def login(self, body)->Dict:
        email = body.get("email")
        password = body.get("password")
        user_id = self.users_repository.login(email, password)
        if not user_id:
            raise Exception("No match.")
        try:
            return{
                "body":{
                    "id":user_id
                },
                "status_code": 200
            }
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
    