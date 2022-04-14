#!/usr/bin/env python
# -*- coding: utf-8 -*-
# IMPORT=====================================================================================================================
import os
import sys
import json
from mongoDb import mongoDb
from eventException import eventException 
from flask import Flask, jsonify, request
from flask_cors import CORS
sys.path.append(os.getcwd())
# VARIABLES==================================================================================================================
json                    = None
classMongoDb            = None
app                     = Flask(__name__)
# FUNCTION===================================================================================================================
def list(connection = None):
    try:
        classMongoDb = mongoDb(connection)
        return jsonify(classMongoDb.readItem(request.get_json(force=True)))
    except Exception as ex:
        return jsonify(eventException(ex))

def create(connection = None):
    try:
        classMongoDb = mongoDb(connection)
        return jsonify(classMongoDb.createItem(request.get_json(force=True)))
    except Exception as ex:
        return jsonify(eventException(ex))

def update(connection = None):
    try:
        classMongoDb = mongoDb(connection)
        return jsonify(classMongoDb.updateItem(request.get_json(force=True)))
    except Exception as ex:
        return jsonify(eventException(ex))

def delete(connection = None):
    try:
        classMongoDb = mongoDb(connection)
        return jsonify(classMongoDb.deleteItem(request.get_json(force=True)))
    except Exception as ex:
        return jsonify(eventException(ex))
# LIST ITEMS=================================================================================================================
@app.route("/listManga", methods = ["POST"])
def listManga():
    return list("manga")

@app.route("/listAutor", methods = ["POST"])
def listAutor():
    return list("autor")

@app.route("/listEditorial", methods = ["POST"])
def listEditorial():
    return list("editorial")

@app.route("/listGenero", methods = ["POST"])
def listGenero():
    return list("genero")
# CREATE ITEMS===============================================================================================================
@app.route("/createManga", methods = ["POST"])
def createManga():
    return create("manga")

@app.route("/createAutor", methods = ["POST"])
def createAutor():
    return create("autor")

@app.route("/createEditorial", methods = ["POST"])
def createEditorial():
    return create("editorial")

@app.route("/createGenero", methods = ["POST"])
def createGenero():
    return create("genero")
# UPDATE ITEMS===============================================================================================================
@app.route("/updateManga", methods = ["POST"])
def updateManga():
    return update("manga")

@app.route("/updateAutor", methods = ["POST"])
def updateAutor():
    return update("autor")

@app.route("/updateEditorial", methods = ["POST"])
def updateEditorial():
    return update("editorial")

@app.route("/updateGenero", methods = ["POST"])
def updateGenero():
    return update("genero")
# DELETE ITEMS===============================================================================================================
@app.route("/deleteManga", methods = ["POST"])
def deleteManga():
    return delete("manga")

@app.route("/deleteAutor", methods = ["POST"])
def deleteAutor():
    return delete("autor")

@app.route("/deleteEditorial", methods = ["POST"])
def deleteEditorial():
    return delete("editorial")

@app.route("/deleteGenero", methods = ["POST"])
def deleteGenero():
    return delete("genero")
# CONFIG=====================================================================================================================
if __name__ == "__main__":
    app.run(debug=True, port=5000)

CORS(app)
