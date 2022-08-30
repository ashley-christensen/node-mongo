const MongoClient = require('mongodb').MongoClient;//require node driver and MONGOCLIENT object
const assert = require('assert').strict;//core module from node strict version

//set up connection to mongodb server
const url = 'mongodb://localhost:27017/';//port number at mongodb server running
const dbname = 'nucampsite';//created this db in the REPL shell in prev exercise

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
 //check error is not null
 //assert allows checking of values 
 assert.strictEqual(err, null);//use assert core module to stop app if errors occurred

 console.log('connected correctly to mongodb database server');

 const db = client.db(dbname);//will connect to nucampsite, db object holds methods

 //delete everything in campsites collection, insert document into that collection, list docs in that collection using find method
 db.dropCollection('campsites', (err, result) => {
  assert.strictEqual(err, null);
  console.log('Dropped Collection', result);//result will say true if successful

  //RECREATE campsite collection and get access to it
  const collection = db.collection('campsites');

  collection.insertOne({ name: "Breadcrumb Trail Campground", description: "Test" }, (err, result) => {
   assert.strictEqual(err, null);//assert that err must strictly equal null
   console.log('Insert Document', result.ops);//ops prop is operations depending on method holds values. insertOne will contian array with doc inserted

   collection.find().toArray((err, docs) => {
    assert.strictEqual(err, null);
    console.log('found documents:', docs);
    client.close();//immediately close client connection to mongo server
   });
  });
 });

});//connect to server with MongoClient. first arg = url, second arg {sets options for update on driver} rec'd by dev team, 3rd arg is callback = err object and the client to connect to db and perform operations

