		/* global $ */
		'use strict'
		$(document).ready(function(){
			//////////////////////////////////////////
	     ///////////////////SETUP///////////////////////////
         /////////////////////////////////////////////////// 
		
		   /* variables and other one-time set up code for the program */

			/////////////////////////////////////////////////
			//////////////// CORE LOGIC /////////////////////
			/////////////////////////////////////////////////
			var BOARD_WIDTH = $('#board').width();	// Number: the maximum X-Coordinate of the screen

			// Every 50 milliseconds, call the update Function (see below)
			setInterval(update, 50);

			// Every time the box is clicked, call the handleBoxClick Function (see below)
			$('#box').on('click', handleBoxClick);

			var positionX = 0;
			var speedX = 10;
			var points = 0;
              /* variables and other one-time set up code for the program */

         /////////////////////////////////////////////////
         //////////////// CORE LOGIC /////////////////////
         /////////////////////////////////////////////////
			/* 
			This Function will be called 20 times/second. Each time it is called,
			it should move the Box to a new location. If the box drifts off the screen
			turn it around! 
			*/
			function update() {
				//change box position
				updateBox();
				//redraw box
				redrawBox();
				// check boundries 
				checkBounds();
			 }
              

             /////////////////////////////////////////////////
             ////////////// HELPER FUNCTIONS /////////////////
              /////////////////////////////////////////////////
			  /* 
			 This Function will be called each time the box is clicked. Each time it is called,
			 it should increase the points total, increase the speed, and move the box to
			 the left side of the screen.
			 */
			 function handleBoxClick() {
				// increasing points and updating the box 
				increasePoints();
				    
				// increase speed 
				speedDown(); 

				//reset the poition of box
				positionReset();
			 }
              /////////////////////////////////////////////////
              ////////////// HELPER FUNCTIONS /////////////////
             /////////////////////////////////////////////////

			 /* main logic of the program: the update / handleBoxClick functions */
			     function increasePoints(){
					points += 1;
					$('#box').text(points);

				 }
				 function speedDown(){
					if (speedX >= 0) {
						speedX += 3;
					} 
					else if (speedX < 0) {
						speedX -= 3;
					}
				 }
				 function positionReset(){
					positionX = 0;
				 }
				 // helper fuctions for update function
				 function updateBox(){
					positionX += speedX;
					$('#box').css("left", positionX);
				 }
				 function redrawBox(){
					$('#box').css("left", positionX);
				 }
				 function checkBounds(){
					if (positionX > BOARD_WIDTH) {
					speedX = -speedX;
				}
				else if (positionX < 0) {
					speedX = -speedX;
				}
				 }
		     }); // DO NOT DELETE THIS LINE OF CODE. ALL JAVASCRIPT ABOVE HERE