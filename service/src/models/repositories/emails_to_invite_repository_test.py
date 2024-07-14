import pytest # tyoe: ignore
import uuid 
from datetime import datetime, timedelta
from .emails_to_invite_repository import EmailToInviteRepository
from src.models.settings.db_connection_handler import db_connection_handler

db_connection_handler.connect()
trip_id = "0a651809-40d9-4ec7-a4c1-b259784e0c53"
@pytest.mark.skip(reason="interacao com o banco") # para ser ignorado pelo pytest, basta tirar para rodar
def test_register_email():
    conn = db_connection_handler.get_connection()
    emails_to_invite_repository = EmailToInviteRepository(conn)

    email_trip_info = {
        'id': str(uuid.uuid4()),
        'trip_id': trip_id,
        'email': "email@email.com"
    }
    emails_to_invite_repository.registry_email(email_trip_info)

@pytest.mark.skip(reason="interacao com o banco")
def test_find_email_from_trip():
    conn = db_connection_handler.get_connection()
    emails_to_invite_repository = EmailToInviteRepository(conn)

    emails = emails_to_invite_repository.find_emails_from_trip(trip_id)

    print()
    print(emails)
