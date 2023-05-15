/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var coordX = 0;
  var coordY = 0;
  var speedX = 0;
  var speedY = 0;
  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  var KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
  }
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.LEFT){
      speedX = -5;
    }else if (event.which === KEY.RIGHT){
        speedX = 5;
      }else if (event.which === KEY.DOWN){
        speedY = 5;
      }else if (event.which === KEY.UP){
        speedY = -5;
      }
  }
  function handleKeyUp(event) {
    if(event.which === KEY.LEFT){
      speedX = 0;
    }else if (event.which === KEY.RIGHT){
        speedX = 0;
      }else if (event.which === KEY.DOWN){
        speedY = 0;
      }else if (event.which === KEY.UP){
        speedY = 0;
      }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem(){
    coordX += speedX;
    coordY += speedY;

  }
  function redrawGameItem(){
    $("#walker").css("left", coordX);
    $("#walker").css("top", coordY);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
