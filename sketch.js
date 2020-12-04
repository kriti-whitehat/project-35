//const Engine = Matter.Engine;
//const World = Matter.World;
//const Bodies = Matter.Bodies;
//const Body = Matter.Body;
var foodS,foodStock,database,happyDog,dog,dogImg;

function preload()
{
  dogImg = loadImage("images/dog.png")
  happyDog = loadImage("images/happyDog.png")
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog = createSprite(250,250,50,50)
  dog.addImage(dogImg)
  dog.scale = 0.2

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
   textSize(20)
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(happyDog)
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : " +foodS,170,150);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}


function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
 if(x<=0){
   x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}



