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

function renderImage(meme_base64, seen_count) {
  let canvas = document.getElementById('meme-canvas');
  let ctx = canvas.getContext('2d');

  let image = new Image();
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
  };
  image.src = meme_base64;

  document.getElementById('seen_count').innerHTML = "SEEN BY: " + seen_count;
  // xconsole.log('seen_count', seen_count);
  console.log('Rendering image:', meme_base64);
}

let meme_uuid = getParameterByName('meme_uuid');
let meme_base64 = localStorage.getItem('rtc-meme-' + meme_uuid);
let seen_count = 0;
let firstString = true;

if (meme_base64) {
  renderImage(meme_base64, seen_count);
} else {
  meme_base64 = "";
}

// WebRTC
// rtc-quickconnect requires a signalling server location and a room name.
let quickConnectMod = require('rtc-quickconnect');
let quickConnectObj = quickConnectMod('https://switchboard.rtc.io/', { room: meme_uuid })
  .on('call:started', function(id, pc, data) {
    console.log('Opened connection to', id);
  });

// Create a data channel and bind to it's events
quickConnectObj.createDataChannel('shared-text');
quickConnectObj.on('channel:opened:shared-text', function (id, channel) {
  console.log('opened data channel with id', id);

  if (meme_base64) {
    console.log('sending meme to another peer');
    seen_count += 1;
    channel.send(seen_count + ':' +meme_base64);
  } else {
    // wait for message to arive
    channel.onmessage = function (evt) {
      console.log('received meme');
      if (firstString) {
        var separator_index = evt.data.indexOf(':');
        seen_count = Number(evt.data.substr(0, separator_index));
        meme_base64 += evt.data.substr(separator_index + 1);
        firstString = false;
      } else {
        meme_base64 += evt.data;
      }
      console.log("seen by", seen_count)
      renderImage(meme_base64, seen_count);
    };
  }
});
