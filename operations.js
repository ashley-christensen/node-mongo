//create(insert), read(find), update(update), delete opterations
const assert = require('assert').strict;

exports.insertDocument = (db, document, collection, callCallAtEndOfEachMethod) => {
 const coll = db.collection(collection);//access/ interact with collection
 coll.insertOne(document, (err, result) => {
  assert.strictEqual(err, null);
  callCallAtEndOfEachMethod(result);//defined somewhere else in code-deliver result to callback, which is programmed to take care of results
 });
};

//list ALL documents
exports.findDocuments = (db, collection, callCallAtEndOfEachMethod) => {
 const coll = db.collection(collection);//coll can now be used to interact with collection
 coll.find().toArray((err, docs) => {
  assert.strictEqual(err, null);
  callCallAtEndOfEachMethod(docs);
 });//find all, put all found into Array
};

exports.removeDocument = (db, document, collection, callCallAtEndOfEachMethod) => {
 const coll = db.collection(collection);//coll can now be used to interact with collection
 coll.deleteOne(document, (err, result) => {
  assert.strictEqual(err, null);
  callCallAtEndOfEachMethod(result);
 });
};

//update a document
exports.updateDocument = (db, document, update, collection, callCallAtEndOfEachMethod) => {
 const coll = db.collection(collection);//coll can now be used to interact with collection
 coll.updateOne(document, { $set: update }, null, (err, result) => {
  assert.strictEqual(err, null);
  callCallAtEndOfEachMethod(result);
 });//1.{infoAboutUpdateObj} 2.{set: {UPDATE OBJECT}} 3.optional configs=null, 4. callback
};//takes in UPDATE object