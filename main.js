// generate a meme and store in LocalStorage

var canvas = document.getElementById("meme-canvas");
var ctx = canvas.getContext("2d");

var flag = 0;
canvas.addEventListener("mousedown", function(){
  flag = 1;
}, false);
canvas.addEventListener("mousemove", function(e){
  if (flag === 0) {
    return;
  }
  
  var mX = e.clientX;
  var mY = e.clientY;

  
  ctx.fillStyle = "green";
  ctx.fillRect(mX, mY, 10, 10);
}, false);

canvas.addEventListener("mouseup", function(){
  flag = 0;
}, false);


document.getElementById('meme-btn').onclick = create_meme;

function create_meme() {
  let data = canvas.toDataURL();

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

  let url = window.location.protocol + '//' + window.location.host + window.location.pathname + "/viewmeme.html?meme_uuid=" + uuid;

  let meme_link = document.getElementById('meme-url');
  meme_link.href = url;
  meme_link.innerHTML = url;
  console.log(url);
}
