    
	
    var canvas = document.getElementById("cnv");
	var ctx = canvas.getContext("2d");
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.90;
	
	var link = document.getElementById("saveButton");
	
	var moveX = 1;
	var moveY = 1;
	var currentX;
	var currentY;
	var flagMouseDown = false;
	var flagTouchStart = false;
	//var brushColor = "white";
	var brushColor = "black";
	var backColor;
	var brushSize = 2;
	var devicePlatform;
	
		function draw(currentX, currentY){
			ctx.lineWidth = brushSize;
			ctx.lineTo(currentX, currentY);
			ctx.strokeStyle=brushColor;
			ctx.stroke();
		}
		
		canvas.addEventListener("mouseup", mouseUpHandler, false);
		canvas.addEventListener("mousemove", mouseMoveHandler, false);
		canvas.addEventListener("mousedown", mouseDownHandler, false);
		canvas.addEventListener("touchstart", touchStartHandler, {passive: false});
		canvas.addEventListener("touchmove", touchMoveHandler, {passive: false});
		canvas.addEventListener("touchend", touchEndHandler, false);
		
		function mouseDownHandler(e) {
			
			flagMouseDown = true;
			ctx.beginPath();
			
        }
		
		function mouseMoveHandler(e) {
			if(flagMouseDown){
			currentX = e.clientX - canvas.offsetLeft;
			currentY = e.clientY - canvas.offsetTop;
			draw(currentX, currentY);
			}
		}
		
		function mouseUpHandler(e) {
            flagMouseDown = false;
			ctx.closePath();
        }
		
		function touchStartHandler(e) {
            flagTouchStart = true;
			ctx.beginPath();
		}
		
		function touchMoveHandler(e) {
            if(flagTouchStart){
			currentX = e.touches[0].clientX - canvas.offsetLeft;
			currentY = e.touches[0].clientY  - canvas.offsetTop;
			draw(currentX, currentY);
			}
        }
		
		function touchEndHandler(e) {
            flagTouchStart = false;
			ctx.closePath();
        }
		
		function colorPicker(color){
			brushColor=color;
			console.log("Brush Color is : "+color);
		}
		
		function backColorPicker(color){
			ctx.save();
			// Normally when you draw on a canvas, the new drawing
			// covers up any previous drawing it overlaps. This is
			// because the default `globalCompositeOperation` is
			// 'source-over'. By changing this to 'destination-over',
			// our new drawing goes behind the existing drawing. This
			// is desirable so we can fill the background, while leaving
			// the chart and any other existing drawing intact.
			// Learn more about `globalCompositeOperation` here:
			// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
			ctx.globalCompositeOperation = 'copy';
		  
			// Fill in the background. We do this by drawing a rectangle
			// filling the entire canvas, using the provided color.
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		  
			// Restore the original context state from `context.save()`
			ctx.restore();
		
			//saving background color for later use:
			backColor = color;
			//	ctx.clearRect(0, 0, canvas.width, canvas.height);
			if(color=='white'){
				brushColor='black';
				
			}
			else if(color=='black'){
				brushColor='white';
			}
			else if(color=='gray'){
				brushColor='white';
			}
			console.log("Background Color is : "+color);
		}
		
		function eraserPicker(size){
			brushColor = document.getElementById("cnv").style.backgroundColor;
			if(brushColor==''){
				brushColor="black";
			}
			brushSize = size;
			console.log("eraser color is : " + brushColor);
		}
		
		function brushPicker(size){
			brushSize=size;
			console.log("Brush Size is : "+size);
		}
		
		function clean(){
			//ctx.fillStyle = backColor;
			ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			ctx.fillStyle = backColor;
			ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		}
		
		function save(){
			
			//console.log(devicePlatform);
			var imgStringURL = canvas.toDataURL();
			console.log(imgStringURL);
			link.href = imgStringURL;
			link.download = "KaushikCodeArt_image.png";
			//link.href = canvas.toDataURL();
			//link.download = "KaushikCodeArt_image.png";
		var params = {data: imgStringURL, prefix: 'KaushikCodeArts_', format: 'PNG', quality: 80, mediaScanner: true};
		var test = window.imageSaver.saveBase64Image(params,
        function (filePath) {
          console.log('File saved on ' + filePath);
        },
        function (msg) {
          console.error(msg);
        }
      );
		}
		
		 function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
		
        }
 
		function onDeviceReady(){
		document.addEventListener("backbutton", onBackKeyDown, false);
		document.addEventListener("saveButton", save, false);
		devicePlatform = device.platform;
		console.log(devicePlatform);
		}
		function onBackKeyDown() {
			if(confirm("Hey!! You really wanna leave??")){
				navigator.app.exitApp();
			}
 		}