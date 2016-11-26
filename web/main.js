// generate a meme and store in LocalStorage

let data = "Yoooo";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

let uuid = guid();
localStorage.setItem("rtc-meme-" + uuid, data);

let url = window.location.protocol + '//' + window.location.host + "/viewmeme.html?meme_uuid=" + uuid;

console.log(url);
