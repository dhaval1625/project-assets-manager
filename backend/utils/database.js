const mongodb = require('mongodb');
const Client = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
   Client.connect(
      'mongodb+srv://dhavalladani:flzf741jSyFe9Quv@meetups.8x5rn0o.mongodb.net/project-assets-manager?retryWrites=true&w=majority'
   )
      .then(client => {
         console.log('Connected');
         cb();
         _db = client.db();
      })
      .catch(err => {
         console.log(err);
         throw err;
      });
};

const getDb = () => {
   if (_db) return _db;
   else throw new Error('No database found!');
};

module.exports = { mongoConnect, getDb };
