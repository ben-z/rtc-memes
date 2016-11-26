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

function renderImage() {
  console.log('Rendering image:', meme_base64);
}

let meme_uuid = getParameterByName('meme_uuid');
let meme_base64 = localStorage.getItem('rtc-meme-' + meme_uuid);

if (meme_base64) {
  renderImage();
}

// WebRTC
let channels = [];
// rtc-quickconnect requires a signalling server location and a room name.
let quickConnectMod = require('rtc-quickconnect');
let quickConnectObj = quickConnectMod('https://switchboard.rtc.io/', { room: meme_uuid })
  .on('call:started', function(id, pc, data) {
    console.log('we have a new connection to: ' + id);

    // Create a data channel and bind to it's events
    quickConnectObj.createDataChannel('shared-meme');
    quickConnectObj.on('channel:opened:shared-meme', function (id, dataChannel) {
      console.log('opened data channel')
      bindDataEvents(dataChannel);
    });

    function bindDataEvents(channel) {
      channels.push(channel);

      console.log(meme_base64);
      if (meme_base64) {
        console.log('sending meme to another peer');
        channel.send(meme_base64);
      }

      // Receive message
      channel.onmessage = function (evt) {
        console.log('evt', evt.data);
        meme_base64 = evt.data;
        renderImage();
      };

    }
  });
