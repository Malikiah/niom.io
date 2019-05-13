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
    find(resolve, collection, criteria, criteriaValue) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName);
            if (criteria === '_id') {
                db.collection(collection).findOne({ '_id': new mongodb_1.ObjectId(criteriaValue) }, (err, collectionData) => {
                    console.log(collectionData);
                    resolve(collectionData);
                });
            }
            else if (!criteria) {
                db.collection(collection).find().toArray((err, collectionData) => {
                    console.log('collection');
                    console.log(collectionData);
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
    insert(collection, data) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const db = client.db(dbName);
            db.collection(collection).insertOne(data);
            return;
        });
    }
    update() {
    }
    delete() {
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map