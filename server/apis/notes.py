import uuid
from flask_restful import Resource, reqparse, fields, marshal_with
from server.toolbox import token_required

createNoteArgs = reqparse.RequestParser()
createNoteArgs.add_argument('title'    , type=str, required=True)
createNoteArgs.add_argument('text'     , type=str, required=True)
createNoteArgs.add_argument('folder_id', type=str, required=True)

editNoteArgs = reqparse.RequestParser()
editNoteArgs.add_argument('note_id'  , type=str, required=True)
editNoteArgs.add_argument('title'    , type=str, required=False)
editNoteArgs.add_argument('text'     , type=str, required=False)
editNoteArgs.add_argument('folder_id', type=str, required=False)

deleteNoteArgs = reqparse.RequestParser()
deleteNoteArgs.add_argument('note_id', type=str, required=True)

getNoteArgs = reqparse.RequestParser()
getNoteArgs.add_argument('note_id', type=str, required=True)

note_field = {
   'note_id': fields.String,
   'title': fields.String,
   'text': fields.String,
   'folder_id': fields.String,
   'owner': fields.String
}

class Notes(Resource):
   @marshal_with(note_field)
   @token_required
   def get(self, current_user):
      from database.database import db, NoteModel
      args = getNoteArgs.parse_args()
      
      note = NoteModel.query.filter_by(args['note_id']).first()

      if not note:
         return {'message': 'not found'}, 404
         
      if note.owner == current_user.user_id:
         return note, 200

      return {'message': 'No authorization'}, 401

   @token_required
   def post(self, current_user):
      from server.database.database import db, NoteModel, FolderModel
      args = createNoteArgs.parse_args()
      folder = FolderModel.query.filter_by(folder_id=args['folder_id']).first()

      if not folder:
         return {"message": "found not found"}, 404
      
      note = NoteModel(
         note_id=str(uuid.uuid4()), 
         title=args['title'], 
         text=args['text'], 
         owner=current_user.user_id, 
         folder_id=folder.folder_id
      )

      db.session.add(note)
      db.session.commit()

      return {
         "message": "Created new note successfully.",
         "note_id": note.note_id
      }, 200

   @token_required
   def put(self, current_user):
      from server.database.database import db, NoteModel
      args = editNoteArgs.parse_args()

      note = NoteModel.query.filter_by(note_id=args['note_id']).first()

      if not note:
         return {"message": "not found"}, 404

      if note.owner == current_user.user_id:
         if args['title'    ]: note.title     = args['title']
         if args['text'     ]: note.text      = args['text' ]
         if args['folder_id']: note.folder_id = args['folder_id']
         return {"message": "Edited note successfully"}, 200

      return {"message": "No authorization"}, 401
   
   @token_required
   def delete(self, current_user):
      from database.database import db, NoteModel
      args = deleteNoteArgs.parse_args()
      
      note = NoteModel.query.filter_by(note_id=args['note_id']).first()

      if not note:
         return {"message": "not found"}, 404

      if note.owner == current_user.user_id:
         db.session.delete(note)
         db.session.commit()
         return {"message": "Note deleted successfully"}, 200

      return {"message": "No authorization"}, 401