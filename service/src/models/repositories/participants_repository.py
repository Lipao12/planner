from psycopg2.extensions import connection
from typing import Dict, Tuple, List

class ParticipantsRepository:
    def __init__(self, conn: connection) -> None:
        self.conn = conn
    
    def registry_participants(self, participant_info: Dict)->None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO participants
                (id, trip_id, emails_to_invite_id, name)
            VALUES
                (%s, %s, %s, %s)
            ''',
            (
                participant_info['id'],
                participant_info['trip_id'],
                participant_info['emails_to_invite_id'],
                participant_info['name'],
            )
        )
        self.conn.commit()

    def find_participants_from_trip(self, trip_id:str)->List[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT p.id, p.name, p.is_confirmed, e.email 
            FROM participants as p
            JOIN emails_to_invite as e
            ON e.id = p.emails_to_invite_id
            WHERE p.trip_id = %s
            ''',
            (
                trip_id,
            )
        )
        participants = cursor.fetchall()
        return participants
    
    def update_participants_status(self, participant_id:str)->None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            UPDATE participants 
                SET is_confirmed = 1
            WHERE id = %s
            ''',
            (
                participant_id,
            )
        )
        self.conn.commit()