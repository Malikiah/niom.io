"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require("mongodb");
const mongodb_1 = require("mongodb");
// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
class DatabaseService {
    findThisOne(resolve, collection, criteria, criteriaValue, action) {
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            const dbName = 'nymadic';
            const db = client.db(dbName);
            console.log('here');
            if (criteria === '_id') {
                db.collection(collection).findOne({ [criteria]: new mongodb_1.ObjectId(criteriaValue) }, (err, collectionData) => {
                    console.log('here');
                    collectionData.db = db;
                    resolve(collectionData);
                });
            }
            else if (!criteria) {
                db.collection(collection).find().toArray((err, collectionData) => {
                    console.log('here');
                    collectionData.db = db;
                    resolve(collectionData);
                });
            }
            else {
                db.collection(collection).findOne({ [criteria]: criteriaValue }, (err, collectionData) => {
                    collectionData.db = db;
                    console.log(collectionData);
                    resolve(collectionData);
                });
            }
        });
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=locator.service.js.map