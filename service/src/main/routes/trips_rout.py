from flask import jsonify, Blueprint, request
from src.drivers.email_sender import send_email 

trips_routes_bp = Blueprint("trip_routes", __name__)

# Imoportação de Controllers
from src.controllers.trip_creator import TripCreator
from src.controllers.trip_finder import TripFinder
from src.controllers.trip_confirmer import TripConfirmer
from src.controllers.trip_updater import TripUpdater

from src.controllers.link_creator import LinkCreator
from src.controllers.link_finder import LinkFinder

from src.controllers.participant_creator import ParticipantCreator
from src.controllers.participant_finder import ParticipantFinder
from src.controllers.participant_confirmer import ParticipantConfirmer

from src.controllers.activity_creator import ActivityCreator
from src.controllers.activity_finder import ActivityFinder

# Importação de Repositorios
from src.models.repositories.trips_repository import TripsRepository
from src.models.repositories.emails_to_invite_repository import EmailToInviteRepository
from src.models.repositories.links_repository import LinkRepository
from src.models.repositories.participants_repository import ParticipantsRepository
from src.models.repositories.activities_repository import ActivitiesRepository

# Importação o gerente de conexões
from src.models.settings.db_connection_handler import db_connection_handler

@trips_routes_bp.route("/trips", methods=["POST"])
def create_trip():
    conn = db_connection_handler.get_connection()
    trips_repository = TripsRepository(conn)
    emails_repository = EmailToInviteRepository(conn)
    controller = TripCreator(trip_repository=trips_repository,email_repository=emails_repository)

    response = controller.create(request.json)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>", methods=["GET"])
def find_trip(tripId):
    conn = db_connection_handler.get_connection()
    trips_repository = TripsRepository(conn)
    controller = TripFinder(trips_repository)

    response = controller.find_trip_detail(tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>", methods=["PATCH"])
def update_trip_destination_date(tripId):
    conn = db_connection_handler.get_connection()
    trips_repository = TripsRepository(conn)
    controller = TripUpdater(trips_repository)
    
    response = controller.update_trip_detail(request.json, tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/confirm", methods=["GET"])
def confirm_trip(tripId):
    conn = db_connection_handler.get_connection()
    trips_repository = TripsRepository(conn)
    controller = TripConfirmer(trips_repository)

    response = controller.confirm(tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/links", methods=["POST"])
def create_trip_link(tripId):
    conn = db_connection_handler.get_connection()
    links_repository = LinkRepository(conn)
    controller = LinkCreator(links_repository)

    response = controller.create(request.json, tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/links", methods=["GET"])
def find_trip_link(tripId):
    conn = db_connection_handler.get_connection()
    links_repository = LinkRepository(conn)
    controller = LinkFinder(links_repository)

    response = controller.find(tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/invites", methods=["POST"])
def invite_to_trip(tripId):
    conn = db_connection_handler.get_connection()
    participants_repository = ParticipantsRepository(conn)
    emails_repository = EmailToInviteRepository(conn)
    controller = ParticipantCreator(participants_repository, emails_repository)

    response = controller.create(request.json, tripId)

    if response['status_code'] == 201:
        invite_details = request.json
        print("Detalhes: ", invite_details)
        participant_emails = invite_details.get('email', [])
        print("Email: ", participant_emails)
        email_body = f"Você foi convidado para a viagem!"
        send_email(participant_emails, email_body)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/activities", methods=["POST"])
def create_activity(tripId):
    conn = db_connection_handler.get_connection()
    activities_repository = ActivitiesRepository(conn)
    controller = ActivityCreator(activities_repository)
    
    response = controller.create(request.json, tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/participants", methods=["GET"])
def get_trip_participants(tripId):
    conn = db_connection_handler.get_connection()
    participants_repository = ParticipantsRepository(conn)
    controller = ParticipantFinder(participants_repository)

    response = controller.find(tripId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/participants/<participantsId>/confirm", methods=["GET"])
def confirm_participant(participantsId):
    conn = db_connection_handler.get_connection()
    participants_repository = ParticipantsRepository(conn)
    controller = ParticipantConfirmer(participants_repository)

    response = controller.confirm(participantsId)

    return jsonify(response['body']), response['status_code']

@trips_routes_bp.route("/trips/<tripId>/activities", methods=["GET"])
def get_trip_activities(tripId):
    conn = db_connection_handler.get_connection()
    activities_repository = ActivitiesRepository(conn)
    trips_repository = TripsRepository(conn)
    controller = ActivityFinder(activities_repository, trips_repository)

    response = controller.find(tripId)

    return jsonify(response['body']), response['status_code']