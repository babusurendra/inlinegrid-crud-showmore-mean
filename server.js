import mongoose from 'mongoose';
import util from 'util';


// config should be imported before importing any other file
import config from './server/config/config';
import app from './server/config/express';


const debug = require('debug')('express-mongoose-es6-rest-api:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
// mongoose.connect(mongoUri);
// mongoose.connection.on('error', () => {
//   throw new Error(`unable to connect to database: ${mongoUri}`);
// });
// mongoUri = "mongodb://localhost/EmployeeDB"
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
//mongoose.connect(mongoUri);
mongoose.connect('mongodb://localhost:27017/EmployeeDB');
//var employeedb = mongoose.connection;
mongoose.connection.on('open',()=>{
   console.log("Database connected");
});
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });
  
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 

// // print mongoose logs in dev env
// if (config.MONGOOSE_DEBUG) {
//   mongoose.set('debug', (collectionName, method, query, doc) => {
//     debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
//   });
// }
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912

  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });

export default app;
