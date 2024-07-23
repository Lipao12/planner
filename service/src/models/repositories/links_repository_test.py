import pytest # tyoe: ignore
import uuid 
from .links_repository import LinkRepository
from src.models.settings.db_connection_handler import db_connection_handler

db_connection_handler.connect()
trip_id = "0a651809-40d9-4ec7-a4c1-b259784e0c53"

@pytest.mark.skip(reason="interacao com o banco") 
def test_register_link():
    conn = db_connection_handler.get_connection()
    link_repository = LinkRepository(conn)

    link_trip_info = {
        'id': str(uuid.uuid4()),
        'trip_id': trip_id,
        'title': "YouTube",
        'link': "youtube.com"
    }
    link_repository.register_link(link_trip_info)

@pytest.mark.skip(reason="interacao com o banco")
def test_find_links_from_trip():
    conn = db_connection_handler.get_connection()
    link_repository = LinkRepository(conn)

    links = link_repository.find_link_from_trip(trip_id)

    assert isinstance(links, list)
    assert isinstance(links[0], tuple)