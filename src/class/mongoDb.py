#!/usr/bin/env python
# -*- coding: utf-8 -*-
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
    count                       = None
    readItems                   = None
    auxOptions                  = None
    database                    = "CrudManga"
    url                         = "localhost"
    port                        = 27017
# INIT=======================================================================================================================
    def __init__(self, connection): 
        try:
            self.client     = MongoClient(self.url, port = self.port)
            self.db         = self.client[self.database]
            self.collection = self.db[connection.title()]
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

    def readItem(self, query = None):
        try:
            self.items = []

            if "$options_filter" in query:
                self.auxOptions = query["$options_filter"]
                self.readItems  = "self.collection.find(query)"
                if "$project"   in self.auxOptions:                    
                    self.readItems = "self.collection.find(query, "+str(self.auxOptions["$project"])+")"
                if "$limit"     in self.auxOptions:
                    self.readItems = self.readItems + ".limit("+str(self.auxOptions["$limit"])+")"
                if "$sort"      in self.auxOptions:
                    self.readItems = self.readItems + ".sort('_id',"+str(self.auxOptions["$sort"])+")"
                if "$skip"      in self.auxOptions:
                    self.readItems = self.readItems + ".skip("+str(self.auxOptions["$skip"])+")"
                if "$count"     in self.auxOptions:
                    self.count     = self.auxOptions["$count"]
                del query["$options_filter"]
            else:
                self.readItems = "self.collection.find(query)" 
                            
            if self.count:
                self.count = None    
                self.count = {"count" : eval("self.collection.count_documents(query)")}
                self.items.append(self.count)

            for auxItem in eval(self.readItems):
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
# TEST CLASS=================================================================================================================
# test = mongoDb("manga")
# print(test.createItem({"_id": 0, "nombre":"prueba"}))
# print(test.readItem({}))
# print(test.readItem({"$options_filter": {"$limit" : 1, "$sort" : -1}, "genero": "Romance"}))
# print(test.readItem({"genero": "Romance", "$options_filter": {"$project" : {"_id": 1}, "$count": False}}))
# print(test.updateItem({"_id": 27, "nombre":"pruebaActualizar"}))
# print(test.deleteItem({"_id": 27}))
# print(test.findItems({"nombre": {"$regex" : "ón", "$options": "ig"}}))
