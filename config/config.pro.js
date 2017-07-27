var config = require('./config.global');
 
config.env = 'production';
config.hostname = 'production.example';
config.mongo.db = 'example_production';
 
module.exports = config;