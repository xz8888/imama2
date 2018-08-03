const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

const dbName = 'privateschool';
MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    let newSchools = []
    findSchools(db, function(schools) {
        for (let i = 0; i < schools.length; i++) {
            newSchools.push({'name': schools[i].title, 
               'type': 'private', 
               'tuition': schools[i].tuition, 
               'website': schools[i].website,
               'language': schools[i].language,
               'grade': schools[i].grade,
               'curr': schools[i].curr
            })
        }

        const db2 = client.db('imama')
        const collection = db2.collection('school')
        collection.insertMany(newSchools)
        client.close()
    })

})

const findSchools = function(db, callback){
    const collection = db.collection('schools')
    collection.find({}).toArray(function (err, schools) {
        callback(schools)
    })
}