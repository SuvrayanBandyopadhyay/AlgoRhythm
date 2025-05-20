const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  waitQueueTimeoutMS: 10000
}); 

const database = client.db("Comments");


async function addComment(id,User,Text) {
    var collections = database.listCollections();
    var collectionExists = false;
    for await (const doc of collections) {
        if(doc.name == id) collectionExists = true;

    }
    if (collectionExists == false) {
        const createColl = await database.createCollection(id);
    }
    else {
        console.log("Collection exists");
    }
    const myColl = database.collection(id);
    const result = await myColl.insertOne({user:User,text:Text});
    if(result.acknowledged){
        return "Commented";
    }
    return "Not Commented"
}

module.exports = addComment;