import uuid
from flask_restful import Resource, reqparse, fields, marshal_with

from server.toolbox import token_required


createFolderArgs = reqparse.RequestParser()
createFolderArgs.add_argument('name', type=str, required=True)

renameFolderArgs = reqparse.RequestParser()
renameFolderArgs.add_argument('folder_id', type=str, required=True)
renameFolderArgs.add_argument('new_name' , type=str, required=True)

deleteFolderArgs = reqparse.RequestParser()
deleteFolderArgs.add_argument('folder_id', type=str, required=True)

getFolderArgs = reqparse.RequestParser()
getFolderArgs.add_argument('folder_id', type=str, required=True)

folder_field = {
   'folder_id': fields.String,
   'name': fields.String
}

class Folder(Resource):
   #get folder data
   @marshal_with(folder_field)
   @token_required
   def get(self, current_user):
      from server.database.database import FolderModel
      args = getFolderArgs.parse_args()

      folder = FolderModel.query.filter_by(folder_id=args['folder_id']).first()

      if not folder:
         return {"message": "Not found"}, 404
      
      if current_user.user_id == folder.owner:
         return folder, 200
      
      return {"message": "No authorization."}, 401
   #create new folder
   @token_required
   def post(self, current_user):
      from server.database.database import FolderModel, db
      args = createFolderArgs.parse_args()
      folder = FolderModel(folder_id=str(uuid.uuid4()),owner=current_user.user_id, name=args['name'])
      db.session.add(folder)
      db.session.commit()
      db.session.refresh(folder)
      return {
         "Message": "Successfully created new folder",
         "folder_id": folder.folder_id
         }, 200

   #update folder
   @token_required
   def put(self, current_user):
      from server.database.database import FolderModel, db
      args = renameFolderArgs.parse_args()

      folder = FolderModel.query.filter_by(folder_id=args['folder_id']).first()

      if not folder:
         return {"message": "not found"}, 404
      
      if current_user.user_id == folder.owner:
         folder.name = args['new_name']
         db.session.commit()
         return {"message": "Successfully renamed folder"}, 200

      return {"message": "No authorization"}, 401

   #delete folder
   @token_required
   def delete(self, current_user):
      from server.database.database import FolderModel, db
      args = deleteFolderArgs.parse_args()
      
      folder = FolderModel.query.filter_by(folder_id=args['folder_id']).first()

      if not folder:
         return {"message": "not found"}, 404

      if current_user.user_id == folder.owner:
         db.session.delete(folder)
         db.session.commit()
         return {"message": "Successfully deleted folder."}, 200
      
      return {"message": "No authorization."}, 401