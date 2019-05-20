"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require("mongodb");
const mongodb_1 = require("mongodb");
// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'niom';
class DatabaseService {
    constructor() {
    }
    find(resolve, collection, criteria, criteriaValue, findAll) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                return err;
            }
            const db = client.db(dbName);
            if (criteria === '_id') {
                db.collection(collection).findOne({ '_id': new mongodb_1.ObjectId(criteriaValue) }, (err, collectionData) => {
                    resolve(collectionData);
                });
            }
            else if (!criteria) {
                db.collection(collection).find().toArray((err, collectionData) => {
                    resolve(collectionData);
                });
            }
            else if (findAll) {
                db.collection(collection).find({ [criteria]: criteriaValue }).toArray((err, collectionData) => {
                    resolve(collectionData);
                });
            }
            else {
                db.collection(collection).findOne({ [criteria]: criteriaValue }, (err, collectionData) => {
                    resolve(collectionData);
                });
            }
        });
    }
    insert(collection, data, resolve) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                return err;
            }
            const db = client.db(dbName);
            db.collection(collection).insertOne(data);
            resolve();
        });
    }
    update() {
    }
    delete(collection, criteriaValue, resolve) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) {
                return err;
            }
            const db = client.db(dbName);
            db.collection(collection).deleteOne({ '_id': new mongodb_1.ObjectId(criteriaValue) });
            resolve();
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map