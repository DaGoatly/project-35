var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotairballoon",balloonImage1); 
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW) || keyDown(RIGHT_ARROW) || keyDown(UP_ARROW) || keyDown(DOWN_ARROW)){
    balloon.changeAnimation(balloonImage2);
  }
  if(keyDown(LEFT_ARROW)){
    //write code to move air balloon in left direction
    readHeight(height.x,height.y);
    updateHeight(-10,0);
  }
  if(keyDown(RIGHT_ARROW)){
    //write code to move air balloon in right direction
    readHeight(height.x,height.y);
    updateHeight(10,0);
  }
    //write code to move air balloon in up direction
    if(keyDown(UP_ARROW)){
      readHeight(height.x,height.y);
      updateHeight(0,-10);
      balloon.scale=balloon.scale -0.01;
    }
  if(keyDown(DOWN_ARROW)){
    readHeight(height.x,height.y);
    //write code to move air balloon in down direction
    updateHeight(0,10);
    balloon.scale=balloon.scale +0.01;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': innerHeight.x + x ,
    'y': innerHeight.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}