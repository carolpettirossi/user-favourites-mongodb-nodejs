const mongoose = require('mongoose');

module.exports = function () {
  mongoose.Promise = global.Promise;
  const db = mongoose.connect(process.env.DB_URI);
  mongoose.connection.on('error', function (err) {
    console.log('\x1b[31m%s\x1b[0m', 'Error: Could not connect to MongoDB. Confirm that your mongodb is runinning (`service mongod status`)?');
  }).on('open', function () {
    console.log('\x1b[32m%s\x1b[0m', 'Connection extablised with MongoDB')
  })
  return db;
};