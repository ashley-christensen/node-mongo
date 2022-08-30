//create(insert), read(find), update(update), delete opterations

exports.insertDocument = (db, document, collection) => {
 const coll = db.collection(collection);//access/ interact with collection
 return coll.insertOne(document);//return promise for insertOne(document) - Node Driver will return promise if no callback is passed in
};

//list ALL documents
exports.findDocuments = (db, collection) => {
 const coll = db.collection(collection);//coll can now be used to interact with collection
 return coll.find().toArray();//node driver returns promise if no callback passed into toArray
};

exports.removeDocument = (db, document, collection) => {
 const coll = db.collection(collection);//coll can now be used to interact with collection
 return coll.deleteOne(document);//return a promise that node driver defaults to if no callback into method
};

//update a document
exports.updateDocument = (db, document, update, collection) => {
 const coll = db.collection(collection);//coll can now be used to interact with collection
 return coll.updateOne(document, { $set: update }, null);//1.{infoAboutUpdateObj} 2.{set: {UPDATE OBJECT}} 3.optional configs=null
 //no callback specified, return keyword will return the promise from node driver api on methods without callbacks

};//takes in UPDATE object