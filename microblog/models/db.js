var settings = require('../setting');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {auto_reconnect:true}), {safe:true});

//var mongo = require('mongodb');
//var monk = require('monk');
//module.exports = monk('localhost:27017/' + settings.db); 