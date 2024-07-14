from psycopg2.extensions import connection
from typing import Dict, Tuple, List

class ActivitiesRepository:
    def __init__(self, conn:connection) -> None:
        self.conn = conn

    def registry_activity(self, activity_trip_info: Dict) -> None:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            INSERT INTO activities
                (id, trip_id, title, occurs_at)
            VALUES
                (%s, %s, %s)
            ''',
            (
                activity_trip_info["id"],
                activity_trip_info["trip_id"],
                activity_trip_info["title"],
                activity_trip_info["occurs_at"],
            )
        )
        self.conn.commit()

    def find_activities_from_trip(self, trip_id:str)->List[Tuple]:
        cursor = self.conn.cursor()
        cursor.execute(
            '''
            SELECT * FROM activities WHERE trip_id = %s
            ''', (trip_id,)
        )
        activities = cursor.fetchall()
        return activities