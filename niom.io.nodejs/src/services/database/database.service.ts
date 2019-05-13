import * as MongoClient from 'mongodb';
import { ObjectId } from 'mongodb';

import { DataInterface } from '../../dependencies/index'

// MongoDB Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'niom';

export class DatabaseService { 
    
    constructor() {

    }

    find(resolve?: any, collection?: string, criteria?: string, criteriaValue?: string) {
      
      MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            
            const db: MongoClient.Db = client.db(dbName);
            
            if(criteria === '_id') {
                db.collection(collection).findOne({ '_id': new ObjectId(criteriaValue) }, ( err, collectionData: any ) => {
                    console.log(collectionData)
                    resolve(collectionData);
                })
            }
            else if(!criteria) { 
                db.collection(collection).find().toArray(( err, collectionData: any ) => {
                    console.log('collection');
                    console.log(collectionData);
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


    insert(collection: string, data: string) {
        
        MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
            const db: MongoClient.Db = client.db(dbName);
            db.collection(collection).insertOne( data );
            return;
        })
        
    }

    update() {

    }

    delete() {

    }
}