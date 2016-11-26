var quickconnect = require('rtc-quickconnect');

quickconnect('https://switchboard.rtc.io/', { room: 'qc-simple-demo' })
  .on('call:started', function(id, pc, data) {
    console.log('we have a new connection to: ' + id);
  });
