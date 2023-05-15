/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const paddleSpeed = 10;
  const ballStart = 200;
  const KEY = {
    "SPACE": 32,
    "UP": 38,    
    "DOWN": 40,
    "S": 83,
    "W": 87
};
  // Game Item Objects
  var board = factoryFunction("#board");
  var ball = factoryFunction("#ball");
  var leftPaddle = factoryFunction("#leftPaddle");
  var rightPaddle = factoryFunction("#rightPaddle");
  var playerOneScore = 0;
  var playerTwoScore = 0;

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                            // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    reposition(leftPaddle);
    reposition(rightPaddle);
    reposition(ball);
    keepInBounds(leftPaddle);
    keepInBounds(rightPaddle);
    ballTracking(ball);
    doCollide(ball, leftPaddle);
    doCollide(ball, rightPaddle);
    redraw(leftPaddle);
    redraw(rightPaddle);
    redraw(ball);
    updatePoints();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.UP){
      leftPaddle.y -= paddleSpeed;
    }
    if(event.which === KEY.DOWN){
      leftPaddle.y += paddleSpeed;
    }
    if(event.which === KEY.W){
      rightPaddle.y -= paddleSpeed;
    }
    if(event.which === KEY.S){
      rightPaddle.y += paddleSpeed;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function factoryFunction($elementId){
    var object = {};
    object.id = $elementId;
    object.x = Number($($elementId).css('left').replace(/[^-\d\.]/g, ''));
    object.y = Number($($elementId).css('top').replace(/[^-\d\.]/g, ''));
    object.width = $($elementId).width();
    object.height = $($elementId).height();
    object.speedX = 0;
    object.speedY = 0;
    if(object.id === "#ball"){
      object.speedX = Math.random(5, 10);
      object.speedY = Math.random(5, 10);
    }
    return object;
  }
  function reposition(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }
  function redraw(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  function keepInBounds(obj){
    if (obj.y <= 0){
      obj.y = 0;
    }
    if (obj.y >= board.height - obj.height){
      obj.y = board.height - obj.height;
    }
   }
   function ballTracking(){
    if(ball.y < 0){
      ball.speedY = -ball.speedY;
    }
    if(ball.y > board.height - ball.height){
      ball.speedY = -ball.speedY;
    }
    if(ball.x <= 0){
      playerTwoScore += 1;
      resetBall();
    }
    if(ball.x > board.width - ball.width){
      playerOneScore += 1;
      resetBall();
    }
    
   }
   function doCollide(obj1, obj2) {
    var speedUp = -1.5
    // sides of the obj1
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.bottomY = obj1.y + obj1.height;
    obj1.rightX = obj1.x + obj1.width;
    // sides of obj2
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.bottomY = obj2.y + obj2.height;
    obj2.rightX = obj2.x + obj2.width;
  
	if ((obj1.rightX > obj2.leftX) && (obj1.leftX < obj2.rightX) && (obj1.topY < obj2.bottomY) && (obj1.bottomY > obj2.topY)){
       ball.speedX *= speedUp;
    } 
		
}
function resetBall(){
  ball.x = ballStart;
  ball.y = ballStart;
  ball.speedX = Math.random(5, 10);
  ball.speedY = Math.random(5, 10);
}
function updatePoints(){
  $("#playerOneScore").text(playerOneScore);
  $("#playerTwoScore").text(playerTwoScore);
  if(playerOneScore >= 11 || playerTwoScore >= 11){
    endGame();
  }
}
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}