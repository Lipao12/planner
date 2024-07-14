from psycopg2.extensions import connection
from typing import Dict, Tuple, List
import psycopg2

class LinkRepository:
    def __init__(self, conn:connection) -> None:
        self.conn = conn
    
    def register_link(self, link_trip_info: Dict):
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO links
                (id, trip_id, title, link)
            VALUES
                (%s, %s, %s, %s)
            ''', 
            (
                link_trip_info['id'],
                link_trip_info['trip_id'],
                link_trip_info['title'],
                link_trip_info['link'],
            )
        )
        self.conn.commit()

    def find_link_from_trip(self, trip_id:str)->List[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM links WHERE trip_id = %s
            ''',(trip_id,)
        )
        links = cursor.fetchall()
        return links