function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let meme_uuid = getParameterByName('meme_uuid');
let meme_base64 = localStorage.getItem(mem_uuid);

if (meme_base64) {
	// render the image, and serve it on webrtc
} else {
	// this is a client and we need to get the image from other webrtc cliens
}

// WebRTC
let channels = [];
// rtc-quickconnect requires a signalling server location and a room name.
let quickConnectMod = require('rtc-quickconnect');
let quickConnectObj = quickConnectMod('https://switchboard.rtc.io/', { room: meme_uuid })
  .on('call:started', function(id, pc, data) {
    console.log('we have a new connection to: ' + id);

    // Create a data channel and bind to it's events
    quickConnectObj.createDataChannel('shared-text');
    quickConnectObj.on('channel:opened:shared-text', function (id, dataChannel) {
      bindDataEvents(dataChannel);
    });

    console.log("created data channels");
    function bindDataEvents(channel) {
      channels.push(channel);
      // Receive message
      channel.onmessage = function (evt) {
        console.log('evt', evt.data);
        messageWindow.value = messageWindow.value + "\n" +  JSON.parse(evt.data).value;
      };

    }


    // Send message
    messageWindow.onkeyup = function (evt) {
      channels.forEach(function(channel) {
        channel.send(
          JSON.stringify({
            value: this.value,
            id: 'david'
          }));
      }.bind(this));
    };
  });

// Create the text area for chatting
var messageWindow = document.createElement('textarea');
messageWindow.rows = 20;
messageWindow.cols = 80;

var bodyElement = document.getElementsByTagName('body')[0];
bodyElement.appendChild(messageWindow);
