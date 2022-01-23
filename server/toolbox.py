from functools import wraps
from flask import request
import jwt
import os

def token_required(f):
   from server.database.database import UserModel
   @wraps(f)
   def decorated(*args, **kwargs):
      token = None

      if 'X-Access-Token' in request.headers:
         token = request.headers['X-Access-Token']
      
      if not token:
         return {"Message": "Token is missing."}, 401

      try:
         data = jwt.decode(token, os.environ['SECRET_KEY'], algorithms=['HS256'])
         current_user = UserModel.query.filter_by(user_id=data['user_id']).first()
      except:
         return {"Message": "Token is invalid."}, 401

      return f(*args, current_user, **kwargs)
   return decorated