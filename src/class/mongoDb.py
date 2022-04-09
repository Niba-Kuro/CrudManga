# IMPORT=====================================================================================================================
import pymongo
from eventException import eventException 
from pymongo import MongoClient
# CLASS======================================================================================================================
class mongoDb:
# VAIRABLES==================================================================================================================
    client                      = None
    db                          = None
    collection                  = None
    collectionSequence          = None
    items                       = None
    database                    = "CrudManga"
    url                         = "localhost"
    port                        = 27017
# INIT=======================================================================================================================
    def __init__(self, connection): 
        try:
            self.client     = MongoClient(self.url, port = self.port)
            self.db         = self.client[self.database]
            self.collection = self.db[connection]
        except Exception as ex:
            eventException(ex)
# METHOD=====================================================================================================================
    def createItem(self, item):
        try:
            self.collectionSequence = self.collection.find_one(sort=[("_id", pymongo.DESCENDING)])["_id"] + 1
            item["_id"] = self.collectionSequence
            if self.collection.find_one({"nombre": {"$regex": item["nombre"], "$options": "i"}}) == None:
                self.collection.insert_one(item)
                return {'status': 0, 'message-en': 'The data has been inserted.', 'message-es': 'Se ha insertado el dato.'}
            return {'status': 1, 'message-en': 'Existing data.', 'message-es': 'Dato existente.'}
        except Exception as ex:
            eventException(ex)

    def readItems(self):
        try:
            self.items = []
            for auxItem in self.collection.find():
                self.items.append(auxItem)
            return self.items
        except Exception as ex:
            eventException(ex)
    
    def updateItem(self, item):
        try:
            self.collection.update_one({"_id" : item["_id"]}, {"$set":item})
            return {'status': 0, 'message-en': 'The data has been updated.', 'message-es': 'Se ha actualizado el dato.'}
        except Exception as ex:
            eventException(ex)

    def deleteItem(self, item):
        try:
            self.collection.delete_one(item)
            return {'status': 0, 'message-en': 'The data has been deleted.', 'message-es': 'Se ha eliminado el dato.'}
        except Exception as ex:
            eventException(ex)            
# CLOSE CLASS================================================================================================================
# TEST CLASS================================================================================================================
# test = mongoDb("Autor")
# print(test.createItem({"_id": 0, "nombre":"prueba"}))
# print(test.readItems())
# print(test.updateItem({"_id": 27, "nombre":"pruebaActualizar"}))
# print(test.deleteItem({"_id": 27}))
