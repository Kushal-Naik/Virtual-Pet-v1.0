//Create variables here

var dog, happyDog;
var happyDogImg, dogImg;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happyDog.png");
}

function setup() {
  database = firebase.database();
  //console.log(database);

  createCanvas(500, 500);
  
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }


  if(foodS===0)
  {
  
    foodS=20;
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("red");
  text("food stock : "+foodS, 300, 30);
  text("Note: Press UP ARROW key to feeed Milk to the dog",14,470);

}

function readStock(data){
  foodS = data.val();
}

function showError(){
  console.log("There is some error in db");
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').set({
    'Food':x
  })
}