from flask_restful import fields
from flask_sqlalchemy import SQLAlchemy
from server.app import app

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/database.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

user_resource_field = {
   'id': fields.Integer,
   'username': fields.String,
   'password': fields.String
}

class UserModel(db.Model):
   __tablename__ = 'accounts'
   id = db.Column(db.Integer, primary_key=True)
   user_id = db.Column(db.String(64), unique=True)
   name = db.Column(db.String(32), nullable=True)
   username = db.Column(db.String(32), unique=True, nullable=False)
   password = db.Column(db.String(128), nullable=False)

   def __repr__(self) -> str:
      return f"User(id={self.id} name={self.username})"

class FolderModel(db.Model):
   __tablename__ = 'folders'
   id = db.Column(db.Integer, primary_key=True)
   folder_id = db.Column(db.String(64), unique=True)
   owner = db.Column(db.String(64), nullable=False)
   name = db.Column(db.String(32), nullable=False)

   def __repr__(self) -> str:
      return f"Folder(id={self.id} owner={self.owner} name={self.name})"

class NoteModel(db.Model):
   __tablename__ = 'notes'
   id = db.Column(db.Integer, primary_key=True)
   note_id = db.Column(db.String(64), unique=True, nullable=False)
   title = db.Column(db.String, nullable=False)
   text = db.Column(db.String, nullable=False)
   owner = db.Column(db.String(64), nullable=False)
   folder_id = db.Column(db.String(64), nullable=True)

   def __repr__(self) -> str:
      return f"Folder(id={self.id} owner={self.owner} folder={self.folder_id})"

def reset():
   clear()
   initialize()

def clear():
   db.drop_all()

def initialize():
   db.create_all()