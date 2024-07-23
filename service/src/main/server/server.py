from flask import Flask
from flask_cors import CORS
from src.main.routes.trips_rout import trips_routes_bp # adicionado para pegar a blueprint

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.register_blueprint(trips_routes_bp) # cadastrando a blueprint