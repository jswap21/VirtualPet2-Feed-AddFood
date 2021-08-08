var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
   milkbottleImg=loadImage("Images/Milk.png");

  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  foodObj=new Food();
  foodObj.getFoodStock();

  feed=createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(780,95);
  addFood.mousePressed(addFoods);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  //foodStock=database.ref('Food');
 // foodStock.on("value",readStock);

  
  

}

// function to display UI
function draw() {
  background(46,139,87);
  foodObj.display();
 /*
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }
*/

currentTime=hour();

  drawSprites();
 /* fill(255,255,254);
  stroke("black");
 text("Food remaining : "+foodS,170,200);
  textSize(13);

  //text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20); */
}
/*
//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}*/

function addFoods(){
  foodObj.foodStock+=1;
  
  database.ref('/').update({
    Food:foodObj.foodStock
  })

}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodObj.deductFood();
  foodObj.updateFoodStock(foodObj.foodStock);

  //foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  //database.ref('/').update({
    //Food:foodObj.getFoodStock(),
    //FeedTime:hour(),
    //gameState:"Hungry"
  //})

  
}