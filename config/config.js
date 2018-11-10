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
      url:
        process.env.MONGO_DB_URI
        || 'mongodb://milkysingh:smallcase123@ds235053.mlab.com:35053/smallcase',
    },
  },
};
const otherValues = {};
module.exports = _.merge(config[environment], otherValues);
