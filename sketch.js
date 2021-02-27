var balloon,balloonImage1,balloonImage2;
var database;
var position;

function preload(){
   bg =loadImage("Images/Hot Air Ballon-01.png");
   balloonImage1=loadAnimation("Images/Hot Air Ballon-02.png");
   balloonImage2=loadAnimation("Images/Hot Air Ballon-02.png","Images/Hot Air Ballon-02.png",
   "Images/Hot Air Ballon-02.png","Images/Hot Air Ballon-03.png","Images/Hot Air Ballon-03.png",
   "Images/Hot Air Ballon-03.png","Images/Hot Air Ballon-04.png","Images/Hot Air Ballon-04.png",
   "Images/Hot Air Ballon-04.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/position');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("<>^vUse arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
