from psycopg2.extensions import connection
from typing import Dict, Tuple
import psycopg2

class UsersRepository:
    def __init__(self, conn: connection) -> None:
        self.conn = conn
    
    def create_user(self, users_info: Dict) -> None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO users
                (id, email, name, password)
            VALUES
                (%s, %s, %s, %s)
            ''',
            (
                users_info["id"],
                users_info["email"],
                users_info["name"],
                users_info["password"],
            )
        )
        self.conn.commit()

    def find_user_by_id(self, user_id:str)->Tuple:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM users WHERE id = %s
            ''', (user_id,)
        )
        trip = cursor.fetchone()
        return trip
    
    def login(self, email, password):
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT id, password FROM users WHERE email = %s
            ''', (email,)
        )
        user = cursor.fetchone()
        print(user)
        if user and user[1] == password:
            return user[0]
        return None