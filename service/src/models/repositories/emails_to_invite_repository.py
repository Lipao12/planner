from psycopg2.extensions import connection
from typing import Dict, Tuple, List
import psycopg2

class EmailToInviteRepository:
    def __init__(self, conn: connection) -> None:
        self.conn = conn

    def registry_email(self, email_trip_info: Dict) -> None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO emails_to_invite
                (id, trip_id, email)
            VALUES
                (%s, %s, %s)
            ''',
            (
                email_trip_info["id"],
                email_trip_info["trip_id"],
                email_trip_info["email"],
            )
        )
        self.conn.commit()

    def find_emails_from_trip(self, trip_id:str)->List[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM emails_to_invite WHERE trip_id = %s
            ''', (trip_id,)
        )
        emails = cursor.fetchall()
        return emails