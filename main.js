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
  
  var mX = e.clientX - $("#meme-canvas").offset().left;
  var mY = e.clientY - $("#meme-canvas").offset().top;
  
  ctx.fillStyle = "green";
  ctx.fillRect(mX - 5, mY - 5, 10, 10);
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

class Template {
  constructor(templateSource, numOfSource, x1 = 0, y1 = 0, width1 = 0, height1 = 0, src1 = "",
	      x2 = 0, y2 = 0, width2 = 0, height2 = 0, src2 = "",
	      x3 = 0, y3 = 0, width3 = 0, height3 = 0, src3 = "",
	      x4 = 0, y4 = 0, width4 = 0, height4 = 0, src4 = "") {

    this.templateSource = templateSource;
    this.numOfSource = numOfSource;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.x4 = x4;
    this.y4 = y4;
    this.width1 = width1;
    this.width2 = width2;
    this.width3 = width3;
    this.width4 = width4;
    this.height1 = height1;
    this.height2 = height2;
    this.height3 = height3;
    this.height4 = height4;
    this.src1 = src1;
    this.src2 = src2;
    this.src3 = src3;
    this.src4 = src4;
  }

}


function myCanvas(template) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  var imageObj1 = new Image();
  var imageObj2 = new Image();
  var imageObj3 = new Image();
  var imageObj4 = new Image();

  var tempSrc = new Image();
  
  imageObj1.src = template.src1;
  imageObj2.src = template.src2;
  imageObj3.src = template.src3;
  imageObj4.src = template.src4; 
  tempSrc.src = template.templateSource;

  tempSrc.onload = function() {
    imageObj1.onload = function() {
      ctx.drawImage(imageObj1, template.x1, template.y1, template.width1, template.height1);
      ctx.drawImage(tempSrc, 0, 0, 450, 300);
    };

    imageObj2.onload = function() {
      ctx.drawImage(imageObj2, template.x2, template.y2, template.width2, template.height2);
      ctx.drawImage(tempSrc, 0, 0, 450, 300);
    };

    imageObj3.onload = function() {
      ctx.drawImage(imageObj3, template.x3, template.y3, template.width3, template.height3);
      ctx.drawImage(tempSrc, 0, 0, 450, 300);
    };

    imageObj4.onload = function() { 
      ctx.drawImage(imageObj4, template.x4, template.y4, template.width4, template.height4);
      ctx.drawImage(tempSrc, 0, 0, 450, 300);
    };
  };

}


function genMeme() {
  var a = [];	
  var i = Math.floor((Math.random() * 278) + 1);
  var j = Math.floor((Math.random() * 278) + 1); 
  var k = Math.floor((Math.random() * 278) + 1);
  var n = Math.floor((Math.random() * 42));
  
  a[0] = new Template("template/1.png", 1, 49, 146, 142, 84, "source/" + i + ".png");
  a[1] = new Template("template/2.png", 1, 0, 0, 450, 100, "source/" + i + ".png");
  a[2] = new Template("template/3.png", 2, 0, 0, 450/2, 300/2 - 3, "source/" + i + ".png", 
		      0	, 300/2 + 3, 450/2, 300/2, "source/" + j + ".png");

  a[3] = new Template("template/4.png", 1, 450/2, 0, 450/2, 300/2, "source/" + i + ".png");
  a[4] = new Template("template/5.png", 1, 275, 60, 125, 125, "source/" + i + ".png");
  a[5] = new Template("template/6.png", 1, 215, 150, 200, 145, "source/" + j + ".png");
  a[6] = new Template("template/7.png", 1, 158, 188, 102, 98, "source/" + i + ".png");
  a[7] = new Template("template/9.png", 1, 0, 0, 450, 209, "source/" + j + ".png");
  a[8] = new Template("template/10.png", 1, 253, 217, 145, 69, "source/" + i + ".png");
  a[9] = new Template("template/11.png", 1, 450/2 - 10, 0, 234, 158, "source/" + i + ".png");
  a[10] = new Template("template/12.png", 1, 21, 62, 415, 220, "source/" + i + ".png");
  a[11] = new Template("template/13.png", 1, 21, 62, 390, 185, "source/" + i + ".png");
  a[12] = new Template("template/14.png", 1, 21, 62, 370, 165, "source/" + i + ".png");
  a[13] = new Template("template/15.png", 1, 230, 167, 208, 130, "source/" + j + ".png");

  a[14] = new Template("template/16.png", 2, 450/2 - 5, 1, 450/2, 300/2 , "source/" + i + ".png", 
		       450/2 - 5, 300/2 + 3, 450/2, 300/2 -3, "source/" + j + ".png");

  a[15] = new Template("template/17.png", 1, 13, 80, 190, 208, "source/" + j + ".png",
		       245, 80, 190, 208, "source/" + i + ".png");

  a[16] = new Template("template/18.png", 1, 199, 0, 250, 255, "source/" + j + ".png");
  a[17] = new Template("template/19.png", 1, 45, 90, 350, 180, "source/" + i + ".png");
  a[18] = new Template("template/20.png", 1, 223, 147, 225, 150, "source/" + i + ".png");
  a[19] = new Template("template/21.png", 1, 45, 70, 340, 160, "source/" + i + ".png");
  a[20] = new Template("template/22.png", 1, 10, 70, 420, 210, "source/" + i + ".png");
  a[21] = new Template("template/23.png", 1, 227, 210, 110, 90, "source/" + i + ".png",
		       340, 210, 110, 90, "source/" + j + ".png");

  a[22] = new Template("template/24.png", 1, 20, 70, 400, 200, "source/" + i + ".png");
  a[23] = new Template("template/25.png", 1, 0, 140, 450, 160, "source/" + i + ".png");
  a[24] = new Template("template/26.png", 1, 21, 127, 200, 160, "source/" + i + ".png",
		       231, 127, 210, 160, "source/" + j + ".png");
  a[25] = new Template("template/27.png", 1, 20, 90, 410, 200, "source/" + i + ".png");
  a[26] = new Template("template/28.png", 1, 20, 20, 350, 160, "source/" + i + ".png");
  a[27] = new Template("template/29.png", 1, 0, 400/3 - 40, 450, 100, "source/" + i + ".png");
  a[28] = new Template("template/30.png", 1, 0, 100, 450, 150, "source/" + i + ".png");
  a[29] = new Template("template/31.png", 1, 0, 300/2, 450/2, 300/2, "source/" + i + ".png");
  a[30] = new Template("template/32.png", 2, 0, 0, 450/2, 300/2 - 3, "source/" + i + ".png", 
                       0, 300/2 + 3, 450/2, 300/2, "source/" + j + ".png");
  a[31] = new Template("template/33.png", 1, 0, 0, 450, 200, "source/" + i + ".png");
  a[32] = new Template("template/34.png", 1, 310, 100, 140, 140, "source/" + i + ".png");
  a[33] = new Template("template/35.png", 1, 0, 0, 450, 250, "source/" + i + ".png");
  a[34] = new Template("template/36.png", 1, 0, 0, 450, 235, "source/" + i + ".png");
  a[35] = new Template("template/37.png", 1, 450/2, 300/2 + 20, 220, 125, "source/" + i + ".png");
  a[36] = new Template("template/38.png", 1, 140, 20, 170, 220, "source/" + i + ".png");
  a[37] = new Template("template/39.png", 2, 450/2, 0, 450/2, 300/3, "source/" + i + ".png", 
                       450/2, 300/3, 450/2, 300/3, "source/" + j + ".png",
                       450/2, 600/3, 450/2, 300/3, "source/" + k + ".png");
  a[38] = new Template("template/40.png", 1, 20, 50, 350, 200, "source/" + i + ".png");
  a[39] = new Template("template/41.png", 1, 0, 300/2, 265, 300/2, "source/" + i + ".png");
  a[40] = new Template("template/42.png", 1, 0, 300/3, 450, 300/3, "source/" + i + ".png");
  a[41] = new Template("template/43.png", 2, 0, 0, 450, 300/4 + 3 - 3, "source/" + i + ".png", 
                                             0, 300*2/4, 450, 300/4, "source/" + j + ".png");
  
  //console.log(n);
  var template = a[n];

  myCanvas(template);
}



document.getElementById('genMeme').onclick = genMeme;
genMeme();
