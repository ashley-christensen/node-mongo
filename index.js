const MongoClient = require('mongodb').MongoClient;//require node driver and MONGOCLIENT object
const dboper = require('./operations');//access to all functions from dboper object

//set up connection to mongodb server
const url = 'mongodb://localhost:27017/';//port number at mongodb server running
const dbname = 'nucampsite';//created this db in the REPL shell in prev exercise

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
 console.log('connected correctly to mongodb database server');

 const db = client.db(dbname);//will connect to nucampsite, db object holds methods

 db.dropCollection('campsites')
  .then(result => {
   console.log('Dropped Collection', result);
  })
  .catch(err => console.log(`No collection to drop`));

 dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
  .then(result => {
   console.log('Insert Document', result.ops);

   return dboper.findDocuments(db, 'campsites');
  }).then(docs => {
   console.log('Found documents', docs);

   return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
    { description: "updated test description" }
    , 'campsites');
  }).then(result => {
   console.log('Updated Document Count:', result.result.nModified);

   return dboper.findDocuments(db, 'campsites');
  }).then(docs => {
   console.log('Found Documents/confirm update:', docs);

   return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
    'campsites');
  }).then(result => {
   console.log('Deleted Document Count:', result.deletedCount);

   return client.close();
  })
  .catch(err => {
   console.log(err);
   client.close();
  });
})
 .catch(err => console.log(err));

