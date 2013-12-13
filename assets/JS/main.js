//by: Jason Rissover


var canvas;
var context;

var num = 0;


init();

function init() {

	canvas = document.createElement( 'canvas' );
	document.body.appendChild( canvas );
	canvas.style.position = 'absolute';
	canvas.style.top = '0px';
	canvas.style.left = '0px';
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth ;

	context = canvas.getContext("2d");
	

	window.addEventListener( 'resize', onWindowResize, false );

	var FPS = 30;
	setInterval(
		function() {
			update();
			draw();
		}
	, 1000/FPS);
}

function onWindowResize( event ) {
	canvas.height = window.innerHeight ;
	canvas.width = window.innerWidth ;
	
}

function draw(){
	context.fillStyle="#FFFFFF";
	context.fillRect(0,0,canvas.width , canvas.height);

	context.fillStyle = "#000";
  	context.fillText(num, 10, 10);
}

function update(){
	num+=1;
}
