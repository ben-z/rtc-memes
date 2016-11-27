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
  let canvas = document.getElementById('meme-canvas');
  let ctx = canvas.getContext('2d');

  let image = new Image();
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
  };
  image.src = meme_base64;

  // document.getElementById('seen_count').innerHTML = "SEEN BY: " + seen_count;
  // xconsole.log('seen_count', seen_count);
  console.log('Rendering image:', meme_base64);
}

let meme_uuid = getParameterByName('meme_uuid');
let meme_base64 = localStorage.getItem('rtc-meme-' + meme_uuid);
let seen_count = 0;

if (meme_base64) {
  seen_count = 1;
  renderImage();
  localStorage.removeItem('rtc-meme-' + meme_uuid);
  console.log('removed rtc-meme-'+meme_uuid);
}

// WebRTC
// rtc-quickconnect requires a signalling server location and a room name.
let quickConnectMod = require('rtc-quickconnect');
let quickConnectObj = quickConnectMod('http://138.197.142.225:8080/', { room: meme_uuid })
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
    channel.send(meme_base64);
  } else {
    // wait for message to arive
    channel.onmessage = function (evt) {
      console.log('received meme', evt.data);
      meme_base64 = evt.data.meme;
      renderImage();
    };
  }
});
