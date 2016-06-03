#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');

program
  .version('0.0.1')
  .option('-h, --host [host]', 'Redis Host')
  .option('-p, --port [port]', 'Redis Port')
  .parse(process.argv);

console.log('Running Nodis with:');
if (program.host) console.log('### redisHost: %s', program.host);
if (program.port) console.log('### redisPort: %s', program.port);

var redis = require("redis");
var client = redis.createClient({host: program.host, port: program.port || 6379});

var elapsed_time = function(note) {
    var precision = 0; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
};

var start = process.hrtime();
var get = client.get('unkown-key-128321932', function(err, reply) {
  elapsed_time('total time');
});

client.quit();
