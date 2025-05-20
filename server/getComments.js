const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  waitQueueTimeoutMS: 10000
}); 

const database = client.db("Comments");


async function getComments(id,index) {
    var collections = database.listCollections();
    var collectionExists = false;
    for await (const doc of collections) {
        if(doc.name == id) collectionExists = true;
    }
    if (collectionExists == false) {
        const createColl = await database.createCollection(id);
    }
    const myColl = database.collection(id);

    var cursor = myColl.find();
    var result = []
    var i = 0;
    for await (const doc of cursor) {

        i+=1;
        if(i > index){
            result.push(doc);
        }
        if(i > parseInt(index) + 5){
            return {result:result,hasAll:false};
        }
    }
    return {result:result,hasAll:true};
}

module.exports = getComments;