var start = 0;
var runSound = new Audio("run2.mp3");
var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");

runSound.loop = true;
var runWorkerId = 0;
var jumpWorkerId = 0;

function m(event){
//Run Key

    if(event.which==13){

      document.getElementById("startbox").style.visibility = "hidden";

        if(runWorkerId == 0){
          runWorkerId = setInterval(run,100);
          scoreWorkerId = setInterval(updateScore,400);
          runSound.play();
          start = 1;
            
          backgroundWokerId = setInterval(moveBackground,100);
          blockWorkerId = setInterval(createBlock,1000);
          moveBlockWorkerId = setInterval(moveBlock,100);
         
        }   
    }
  
//jump Key

    if(event.which==32){
      
      if(start==1){

         if(jumpWorkerId == 0){
           clearInterval(runWorkerId);
           runSound.pause();
           jumpSound.play();
           jumpWorkerId = setInterval(jump,100);
    //       newScore = newScore + 5;
         } 
         
      }     
    }
}

//Run Function
var runImageNumber = 1;

function run(){
     
    runImageNumber = runImageNumber + 1;
     
      if(runImageNumber == 9){
        runImageNumber = 1;
      }

    document.getElementById("boy").src = "Run ("+ runImageNumber + ").png";
    
}

//Jump Function
var jumpImageNumber = 1;
var playerMarginTop = 408;

function jump(){

  jumpImageNumber = jumpImageNumber + 1;
  
//Boy Fly
  if(jumpImageNumber <= 7){
    playerMarginTop = playerMarginTop - 30;
    document.getElementById("boy").style.marginTop = playerMarginTop + "px";
  }

//Boy Land  
  if(jumpImageNumber >= 8){
    playerMarginTop = playerMarginTop + 30;
    document.getElementById("boy").style.marginTop = playerMarginTop + "px";
  } 

    if(jumpImageNumber == 13){
      jumpImageNumber = 1;
      clearInterval(jumpWorkerId);
      jumpWorkerId = 0;
      runWorkerId = setInterval(run,100);
      runSound.play();
    }

    document.getElementById("boy").src="Jump (" + jumpImageNumber + ").png";

}

// Move Background
var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWokerId = 0;

function moveBackground(){
  backgroundX = backgroundX - 20;
  background.style.backgroundPositionX = backgroundX + "px";
}

// Update Score
var scoreWorkerId = 0;
var newScore = 0;

var highScore = localStorage.getItem("highScore") || 0; //high Score

function updateScore(){
  newScore = newScore + 1;
  document.getElementById("score").innerHTML = newScore;

}

// Create Block
var blockMarginLeft = 500;
var blockWorkerId = 0;
var blockId = 1;

function createBlock(){
 //creat div in JavaScript
  var block = document.createElement("div");

  block.className ="block";
  block.id ="block" + blockId;
  blockId++;
 //creat random number
  var gap = Math.random() * (1000-400) + 400;
  blockMarginLeft = blockMarginLeft + gap;

  block.style.marginLeft = blockMarginLeft + "px";
 //creat block in background
  background.appendChild(block);

} 

var moveBlockWorkerId = 0;
function moveBlock(){
  
  for(var i = 1;i <= blockId; i++){
    var currentBlock = document.getElementById("block" + i);
    var currentMarginLeft = currentBlock.style.marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 20;  //convert string into integer
    currentBlock.style.marginLeft = newMarginLeft + "px";

  //  alert(playerMarginTop);
  //How to Dead
   if(newMarginLeft < 320){
      if(newMarginLeft > 207){

        if(playerMarginTop <= 408){
          if(playerMarginTop > 350){

            clearInterval(runWorkerId);
            runSound.pause();
            clearInterval(jumpWorkerId);
            jumpWorkerId= -1;
            clearInterval(backgroundWokerId);
            clearInterval(scoreWorkerId);
            clearInterval(moveBlockWorkerId);
                         
            deadWorkerId = setInterval(dead,100);
          }
        }   
      }
    }
  }

}

//Dead Function
var deadImageNumber = 1;
var deadWorkerId = 0;

function dead(){
  
  deadImageNumber++;
  
    if(deadImageNumber == 10 ){

      clearInterval(deadWorkerId);

      document.getElementById("gameOver").style.visibility ="visible";
      document.getElementById("text2").innerHTML ="YOUR SCORE : "+ newScore;
      
      document.getElementById("text3").innerHTML ="High Score :"+ highScore;
    }

  document.getElementById("boy").src = "Dead ("+ deadImageNumber +").png";
  deadSound.play();

// High Score
  if (newScore > highScore) {
    highScore = newScore;
    localStorage.setItem("highScore", highScore);
    document.getElementById("text3").innerText ="High score"+ highScore;
  }

}

// Page Reaload
function reload(){
    location.reload();
}

//Idle
var idleNumber = 1;
var idleWorkerId = 0;
//Boy in Start Box
function idle(){
     idleNumber++;
      if(idleNumber==11){
        idleNumber = 1;
      }
     document.getElementById("idle").src="Idle ("+ idleNumber +").png";
}

if(idleWorkerId==0){
  idleWorkerId = setInterval(idle,100);
}  
