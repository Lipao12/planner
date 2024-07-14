from flask import Flask
from src.main.routes.trips_rout import trips_routes_bp # adicionado para pegar a blueprint

app = Flask(__name__)

app.register_blueprint(trips_routes_bp) # cadastrando a blueprint