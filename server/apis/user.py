import uuid
from flask_restful import Resource, reqparse
from server.toolbox import token_required

registerParser = reqparse.RequestParser()
registerParser.add_argument("username", type=str, required=True)
registerParser.add_argument("name", type=str)
registerParser.add_argument("password", type=str, required=True)

deleteParser = reqparse.RequestParser()
deleteParser.add_argument('user_id', type=str, required=True)

class User(Resource):
   #get user data
   @token_required
   def get(self, current_user):
      from server.database.database import FolderModel, NoteModel
      #generate note data
      notes = []
      folders = FolderModel.query.filter_by(owner=current_user.user_id).all()

      for i in folders:
         notes_in_folder = []
         raw_notes_in_folder = NoteModel.query.filter_by(folder_id=i.folder_id).all()
         for j in raw_notes_in_folder:
            notes_in_folder.append({
               "title": j.title,
               "text": j.text,
               "note_id": j.note_id
            }) 

         folder_data = {
            "folder_name": i.name,
            "folder_id": i.folder_id,
            "notes": notes_in_folder
         }

         notes.append(folder_data)


      return {
         'username': current_user.username,
         'name': current_user.name,
         'note_data' : notes
      }, 200
   
   #create user
   def post(self):
      from server.database.database import db, UserModel, FolderModel
      args = registerParser.parse_args()
      user = UserModel(
         user_id=str(uuid.uuid4()), 
         name=args['name'], 
         username=args['username'], 
         password=args['password']
      )

      #check if username already existed
      if len(UserModel.query.filter_by(username=args['username']).all()) != 0:
         return {'Message': 'This account already exists'}, 400

      db.session.add(user)
      db.session.commit()
      db.session.refresh(user)

      #Create folder name 'Uncategorized'
      uncategorized = FolderModel(
         folder_id=str(uuid.uuid4()),
         owner=user.user_id,
         name='Uncategorized'
      )

      db.session.add(uncategorized)
      db.session.commit()

      return {'Message': 'Successfully created new account'}, 200

   #delete user
   @token_required
   def delete(self, current_user):
      from server.database.database import FolderModel, NoteModel
      return {}, 501