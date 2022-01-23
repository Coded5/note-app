
import jwt
import datetime
from flask_restful import Resource, reqparse

import os

login_parser = reqparse.RequestParser()
login_parser.add_argument('username', type=str, required=True)
login_parser.add_argument('password', type=str, required=True)

class Login(Resource):
   def post(self):
      from server.database.database import UserModel
      args = login_parser.parse_args()

      user = UserModel.query.filter_by(username=args['username']).first()
      if user and user.password == args['password']:
         token = jwt.encode({
            'user_id': user.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
         }, os.environ['SECRET_KEY'], algorithm="HS256")

         return {
            "Message": "Logged in successfully",
            "token": token
         }, 200
      return {"Message": "Wrong username or password"}, 401