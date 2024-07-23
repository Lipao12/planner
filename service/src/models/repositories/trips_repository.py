from psycopg2.extensions import connection
from typing import Dict, Tuple
import psycopg2

class TripsRepository:
    def __init__(self, conn: connection) -> None:
        self.conn = conn

    def create_trip(self, trips_info: Dict) -> None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO trips
                (id, destination, start_date, end_date, owner_name, owner_email, user_id)
            VALUES
                (%s, %s, %s, %s, %s, %s, %s)
            ''',
            (
                trips_info["id"],
                trips_info["destination"],
                trips_info["start_date"],
                trips_info["end_date"],
                trips_info["owner_name"],
                trips_info["owner_email"],
                trips_info["user_id"]
            )
        )
        self.conn.commit()

    def find_trip_by_id(self, trip_id:str)->Tuple:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM trips WHERE id = %s
            ''', (trip_id,)
        )
        trip = cursor.fetchone()
        return trip

    def find_trips_from_user(self, user_id:str)->Tuple:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM trips WHERE user_id = %s
            ''', (user_id,)
        )
        trips = cursor.fetchall()
        return trips
    
    def update_trip_destination_and_date(self, trip_id:str, destination:str, 
                                         start_date:str, end_date:str)->None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            UPDATE trips
            SET destination = %s, start_date = %s, end_date = %s
            WHERE id = %s
            ''',(destination,start_date,end_date,trip_id)
        )
        self.conn.commit()
    
    def update_trip_status(self, trip_id:str)->None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            UPDATE trips
                SET status = 1
            WHERE id = %s
            ''',(trip_id,)
        )
        self.conn.commit()