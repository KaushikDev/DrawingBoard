window.addEventListener("load", () => {
  let cnv = document.querySelector("canvas");
  let ctx = cnv.getContext("2d");

  cnv.style.cursor = "url('./assets/tool-images/pen.svg'), auto";

  console.log(cnv.offsetHeight + " : offsetHeight");
  console.log(cnv.offsetWidth + " : offsetWidth");
  console.log(cnv.offsetLeft + " : offsetLeft");
  console.log(cnv.offsetTop + " : offsetTop");
  //console.log(cnv.offsetParent + "offsetParent");

  let cw = cnv.width = window.innerWidth;
  let ch = cnv.height = window.innerHeight;

  
  let isTouching = false;
  let currentX;
  let currentY;

  let topMenu = document.querySelector(".top-menu");
  
  let brushSizeInput = document.querySelector("#brush-size");
  let brushSize = brushSizeInput.value;
  
  let brushColorInput = document.querySelector("#brush-color");
  let brushColor = brushColorInput.value;
  let previousBrushColor = brushColor; 
  
  let canvasColorInput = document.querySelector("#canvas-color");
  let canvasColor = canvasColorInput.value;
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0,0,cw,ch);
  
  let sideMenu = document.querySelector(".side-menu");
  
  let shareBtn = document.querySelector(".share-btn");
  let shareAppDiv = document.querySelector(".share-app");
  let toggleShareAppSwitch = false;
  
  let brushBtn = document.querySelector(".brush-btn");
  let eraserBtn = document.querySelector(".eraser-btn");
  let downloadBtn = document.querySelector(".download-btn");
  let trashBtn = document.querySelector(".trash-btn");
    
  let settingsBtn = document.querySelector(".settings");
  let toggleMenuSwitch = false;



 
 
  const startPosition = () => {
    if(toggleShareAppSwitch){
      shareAppDiv.style.visibility = "hidden";
      toggleShareAppSwitch = false;
    }
    isTouching = true;
    ctx.beginPath();
  };

  const paintDesktop = (e) => {
    if (!isTouching) return;
    // currentX =
    //   e.clientX - cnv.offsetLeft;
    //  currentY =
    //    e.clientY - cnv.offsetTop;

    // currentX = e.clientX * (cw/cnv.offsetWidth) - cnv.offsetLeft;
    // currentY = e.clientY * (ch/cnv.offsetHeight) - cnv.offsetTop;

    currentX = e.clientX - cnv.offsetLeft;
    currentY = e.clientY - cnv.offsetTop;


    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = brushColor;
    ctx.stroke();
  };

  const paintMobile = (e) => {
    if (!isTouching) return;
    currentX = e.touches[0].clientX - cnv.offsetLeft;
    currentY = e.touches[0].clientY - cnv.offsetTop;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = brushColor;
    ctx.stroke();
  };

  const endPosition = () => {
    isTouching = false;
    ctx.closePath();
  };


  const toggleMenu = () => {
        if(toggleMenuSwitch){
          topMenu.style.visibility = "hidden";
          sideMenu.style.visibility = "hidden";
          toggleMenuSwitch = false;
        }
        else{
          topMenu.style.visibility = "visible";
          sideMenu.style.visibility = "visible";
          toggleMenuSwitch = true;
        }
  
  }

  const toggleShareApp = () => {
    if(!toggleShareAppSwitch){
      shareAppDiv.style.visibility = "visible";
      toggleShareAppSwitch = true;
    }
  };

const clean = () => {
  ctx.clearRect(0,0,cw,ch);
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0,0,cw,ch);
};

const erase = () => {
  cnv.style.cursor = "url('./assets/tool-images/eraser.svg'), auto";
  brushColor = canvasColor;
};

const repaint = () => {
  cnv.style.cursor = "url('./assets/tool-images/pen.svg'), auto";
  brushColor = previousBrushColor;
};

const downloadImg = () => {
    let imgURL = cnv.toDataURL();
    downloadBtn.href = imgURL;
    downloadBtn.download = "sketch_img.png";
 };

 const changeBrushSize = () => {
  let value = brushSizeInput.value;
  brushSize = value;
 };

 const changeBrushColor = () => {
  
  let value = brushColorInput.value;
  brushColor = value;
  previousBrushColor = brushColor;
 };

 const changeCanvasColor = () => {
  let value = canvasColorInput.value;
  canvasColor = value;
  ctx.fillStyle = canvasColor;
  ctx.fillRect(0,0,cw,ch);
 };

 const resizeCanvas = () => {
 cw = window.innerWidth;
 ch = window.innerHeight;
 }

  cnv.addEventListener("mousedown", startPosition);
  cnv.addEventListener("mousemove", paintDesktop);
  cnv.addEventListener("mouseup", endPosition);
  cnv.addEventListener("touchstart", startPosition);
  cnv.addEventListener("touchmove", paintMobile);
  cnv.addEventListener("touchend", endPosition);
  settingsBtn.addEventListener("click", toggleMenu);
  shareBtn.addEventListener("click", toggleShareApp);
  trashBtn.addEventListener("click", clean);
  eraserBtn.addEventListener("click", erase);
  brushBtn.addEventListener("click", repaint);
  downloadBtn.addEventListener("click", downloadImg);
  brushSizeInput.addEventListener("click", changeBrushSize);
  brushColorInput.addEventListener("change", changeBrushColor);
  canvasColorInput.addEventListener("change", changeCanvasColor);
  window.addEventListener("resize", resizeCanvas);
});
