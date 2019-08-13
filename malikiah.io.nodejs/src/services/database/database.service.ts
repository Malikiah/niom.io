import * as MongoClient from 'mongodb';
import { ObjectId } from 'mongodb';

import { DataInterface } from '../../dependencies/index'
import { resolve } from 'dns';

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'niom';

export class DatabaseService { 
    
    constructor() {

    }

    find(resolve: any, collection?: string, criteria?: string, criteriaValue?: string, findAll?: boolean) {
      
      MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            if (err) { 
               return err;
             }

            const db: MongoClient.Db = client.db(dbName);
            
            if(criteria === '_id') {
                db.collection(collection).findOne({ '_id': new ObjectId(criteriaValue) }, ( err, collectionData: any ) => {
                    resolve(collectionData);
                })
            }
            else if(!criteria) { 
                db.collection(collection).find().toArray(( err, collectionData: any ) => {
                    resolve(collectionData);
                    })
            }
            else if(findAll) {
                db.collection(collection).find({ [criteria]: criteriaValue }).toArray(( err, collectionData: any ) => {
                    resolve(collectionData); 
                })
            }
            else { 
                db.collection(collection).findOne({ [criteria]: criteriaValue }, ( err, collectionData: any ) => {
                    resolve(collectionData); 
                })
            }
        }) 
    }


    insert(collection: string, data: string, resolve?: any) {
        
        MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
            if (err) { 
                return err;
            }
            const db: MongoClient.Db = client.db(dbName);
            db.collection(collection).insertOne( data );
            resolve();
        }) 
        
    }

    update(_id: string, collection: string, criteria: string, criteriaValue: string, resolve?: any) {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
            if(err) {
                return err;
            }
            const db: MongoClient.Db = client.db(dbName);
            db.collection(collection).updateOne({'_id': new ObjectId(_id)}, {$set: {criteria: criteriaValue}});
            resolve();
        })
    }

    delete(collection: string, criteriaValue: string, resolve: any) {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
            if (err) { 
                return err;
            }
            const db: MongoClient.Db = client.db(dbName);
            db.collection(collection).deleteOne({ '_id': new ObjectId(criteriaValue) });
            resolve();
        })
    }
}