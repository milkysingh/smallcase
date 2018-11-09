const _ = require('lodash');

const environment = process.env.NODE_ENV || 'DEVELOPMENT';

const config = {
  DEVELOPMENT: {
    mongo: {
      url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/smallcase',
    },
  },
  PRODUCTION: {
    mongo: {
      url: process.env.MONGO_DB_URI,
      username: 'abc',
      password: 'abc@123',
    },
  },
};
const otherValues = {};
module.exports = _.merge(config[environment], otherValues);
