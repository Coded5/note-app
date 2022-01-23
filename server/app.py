import os
from flask import Flask
from flask_restful import Api

app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

from server.apis.login import Login
from server.apis.user import User
from server.apis.folder import Folder
from server.apis.notes import Notes

from server.database.database import initialize, clear

api.add_resource(Notes, '/note')
api.add_resource(User, '/user')
api.add_resource(Folder, '/folder')
api.add_resource(Login, '/login')