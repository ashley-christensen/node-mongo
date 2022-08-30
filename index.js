const MongoClient = require('mongodb').MongoClient;//require node driver and MONGOCLIENT object
const assert = require('assert').strict;//core module from node strict version
const dboper = require('./operations');//access to all functions from dboper object

//set up connection to mongodb server
const url = 'mongodb://localhost:27017/';//port number at mongodb server running
const dbname = 'nucampsite';//created this db in the REPL shell in prev exercise

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

 assert.strictEqual(err, null);//use assert core module to stop app if errors occurred

 console.log('connected correctly to mongodb database server');

 const db = client.db(dbname);//will connect to nucampsite, db object holds methods


 db.dropCollection('campsites', (err, result) => {
  assert.strictEqual(err, null);
  console.log('Dropped Collection', result);//result will say true if successful

  //below method won't be run until collection is dropped??
  dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites',
   result => {
    console.log('Insert Document', result.ops);//insertOne.ops will contian array with doc inserted

    //below method won't run until insertDocument method finished!!!??
    dboper.findDocuments(db, 'campsites', docs => {
     console.log('Found documents', docs);
     //find doc that has name: "xyz entered below", update key and value
     dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
      { description: "updated test description" }
      , 'campsites', result => {
       console.log('Updated Document Count:', result.result.nModified);

       dboper.findDocuments(db, 'campsites', docs => {
        console.log('Found Documents/confirm update:', docs);

        dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
         'campsites', result => {
          console.log('Deleted Document Count:', result.deletedCount);

          client.close();//immediately close client connection to mongo server
         }
        );
       });
      }
     );
    });
   });
 });
});

