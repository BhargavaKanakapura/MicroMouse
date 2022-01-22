import {initReader, getRows, getCols, getDir, getPos, getEndPoints, readMaze, convertPosToString} from "./mazereader.js";
import {stopScript, printUI} from "/Micro_Mouse_Sim/sources/scripts/script.js";
import {st_coridorLength, st_paths, st_isWallInFront, st_isWallRight, st_isWallLeft} from "./tools/sensortools.js";
import {compile} from "./compiler.js";


var MAZE_HEIGHT, MAZE_WIDTH, 
	MAZE, MazeGUI, 
	mousePos, startPos, 
	mouseDir, initMouseDir, 
	endPos, 
	totalSteps, time, 
	timesCalledMoveForward,
	sessionHighScore, sessionBestTime;

export var finish;


export function initMaze(mazeID=1) {
	/*
	Initialize the maze
	*/

	initReader(mazeID); //Initialize the maze reader

	MAZE_HEIGHT = getRows(); //Column height of the maze
	MAZE_WIDTH = getCols();  //Row width of the maze

	MAZE = readMaze(); //Read the maze

	mousePos = getPos();     //The mouse starts at the start position square
	startPos = mousePos;     //Store the starting location of the mouse
	mouseDir = getDir();     //Get the original direction 
	initMouseDir = mouseDir; //Store the initial direction of the mouse

	endPos = getEndPoints(); //The list of possible end positions of the maze
	finish = false;   //The maze has not been solved

	totalSteps = 0;             //The number of times the mouse has moved forward
	time = 0;                   //The total time in seconds
	timesCalledMoveForward = 0; //The number of times the moveForward() function has been called per call of micromouseAI()

	sessionHighScore = Infinity; //Best score of the session
	sessionBestTime = Infinity;  //Best time to complete maze

	MazeGUI = document.getElementById('maze');
	loadMazeGUI() //Load the maze
	
}


function loadMazeGUI() {
    /*
    Load the maze as a HTML table
    */

    for (let r = 0; r < MAZE_HEIGHT; r++) {

        let newRow = MazeGUI.insertRow(-1); //Add a new row to the maze

        for (let c = 0; c < MAZE_WIDTH; c++) {

            let newCell = newRow.insertCell(-1); //Add a new square to the row
			
			newCell.style.borderColor = '#474747'; //Initialize the default border color of the cell
			newCell.style.borderStyle = 'dotted';  //Initialize the border style

            if (r == mousePos[0] && c == mousePos[1]) {     
                newCell.innerHTML = getMouseImage(); //Add an X to represent the mouse      
            }

            let borders = MAZE[convertPosToString(r, c)]  //The borders of the cell
            //The top border
            if (borders[0] == 1) {
                //Darken the borders
                newCell.style.borderTopColor = "white";
                newCell.style.borderTopWidth = "2px";
                newCell.style.borderTopStyle = "solid";
            }
            //The bottom border
            if (borders[1] == 1) {
                newCell.style.borderBottomColor = "white";
                newCell.style.borderBottomWidth = "2px";
                newCell.style.borderBottomStyle = "solid";
            }
            //The right borders
            if (borders[2] == 1) {
                newCell.style.borderRightColor = "white";
                newCell.style.borderRightWidth = "2px";
                newCell.style.borderRightStyle = "solid";
            }
            //The left borders
            if (borders[3] == 1) {
                newCell.style.borderLeftColor = "white";
                newCell.style.borderLeftWidth = "2px";
                newCell.style.borderLeftStyle = "solid";
            }
            
            newCell.id = convertPosToString(r, c); //Set the table id
            newCell.style.backgroundColor = '#000000';

        }
    }
}


export function unloadMazeGUI() {
	/*
	Delete all rows frpm the maze
	*/
	
	for (let i = 0; i < MAZE_HEIGHT; i++) {
		MazeGUI.deleteRow(-1);
	}
	
}


function changeMousePosition(newRow, newCol) {
    /*
    Change the position of the mouse on the maze
    */
    
    let oldRow = mousePos[0];
    let oldCol = mousePos[1];
    
    document.getElementById(convertPosToString(oldRow, oldCol)).innerHTML = "";  //Clear the old square
    document.getElementById(convertPosToString(newRow, newCol)).innerHTML = getMouseImage(); //Display the mouse on the new square
    
    mousePos = [newRow, newCol] //Update the position of the mouse
    
}


function getMouseImage() {
    /*
    Create the mouse image and rotate based on the orientation of the mouse
    */
    
    switch(mouseDir) {  
        case "N": //The mouse is facing upwards
            return '&#9650';
            break;
        case "S":
            return "&#9660";
            break;
        case "E": //The mouse is facing right
            return "&#9654";
            break;         
        case "W":
            return "&#9664";
            break;     
    }
    
}


export function isWallInFront() {
    /*
    Check if there is a wall in front of the mouse
    */
    
    return st_isWallInFront(mousePos, mouseDir, MAZE);
    
}


export function isWallRight() {
    /*
    Check if there is a wall to the right of the mouse
    */
    
    return st_isWallRight(mousePos, mouseDir, MAZE);
    
}


export function isWallLeft() {
    /*
    Check if there is a wall to the left of the mouse
    */
    
    return st_isWallLeft(mousePos, mouseDir, MAZE);
    
}


export function corridorLength() {
	/*
	Get the longest continuous 
	*/
	
	return st_coridorLength(mousePos, mouseDir, MAZE);
	
} 


export function paths() {
	/*
	Get the number of paths from a point
	*/
	
	return st_paths(MAZE, mousePos);
	
}


export function turnRight() {
    /*
    Turn the mouse right (clockwise)
    */
    
    switch(mouseDir) {
        
        case "N": //The mouse is facing upwards
            mouseDir = "E";
            break;
            
        case "S":
            mouseDir = "W";
            break;
            
        case "E": //The mouse is facing right
            mouseDir = "S";
            break;
            
        case "W":
            mouseDir = "N";
            break;
    }
    
    changeMousePosition(mousePos[0], mousePos[1]);
    
}


export function turnLeft() {
    /*
    Turn the mouse left (counterclockwise)
    */
    
    switch(mouseDir) {
        
        case "N": //The mouse is facing upwards
            mouseDir = "W";
            break;
            
        case "S":
            mouseDir = "E";
            break;
            
        case "E": //The mouse is facing right
            mouseDir = "N";
            break;
            
        case "W":
            mouseDir = "S";
            break;
    }
    
    changeMousePosition(mousePos[0], mousePos[1]);
    
}


export function moveForward() {
    
    let r = mousePos[0]; //current row
    let c = mousePos[1]; //current col
    
    timesCalledMoveForward ++; //moveForward has been called
    
    if (!isWallInFront() && timesCalledMoveForward == 1) {
    
        switch(mouseDir) {

            case "N": //The mouse is facing upwards
                changeMousePosition(r - 1, c); //Move the mouse up one square
                break;

            case "S":
                changeMousePosition(r + 1, c);
                break;

            case "E": //The mouse is facing right
                changeMousePosition(r, c + 1);
                break;

            case "W":
                changeMousePosition(r, c - 1);
                break;
        }
        
        totalSteps ++; //increment the total number of steps
        
        return true; //the mouse successfully moved one step forward
        
    }
	
	else if (timesCalledMoveForward != 1) {
		printUI('moveForward could not be called more than once', 'warning');
	}
	
	else {
		printUI('moveForward could not be called if there is a wall in front', 'warning')
	}
	
    return false; //The mouse did not move forward
    
}


export function foundFinish() {
    /*
    This function is called when the user thinks that they have found the end of the maze.
    If they have, the number of moves and runtime are displayed
    */
    
    for (let i = 0; i < endPos.length; i++) {
		
        if (endPos[i][0] == mousePos[0] && endPos[i][1] == mousePos[1]) {
			
            printUI('The maze was completed in %totalSteps steps and %time seconds!');
			stop();
			
			if (totalSteps > sessionHighScore) {
				sessionHighScore = totalSteps;
			}
			
			if (time > sessionBestTime) {
				sessionBestTime = time;
			}
			
			stop();
            return true;
			
        }
		
    }
    
    printUI('The maze was not completed', 'err');
	stop();
	
    return false;
    
}


export function resetCount() {
    /*
    Reset the step counter if the mouse is back at the starting position
    */
    
    if (startPos[i][0] == mousePos[0] && startPos[i][1] == mousePos[1]) {
        totalSteps = 0;
    }
    
}


function resetForwardCallCount() {
    /*
    Reset the number of times moveForward() was called in one call of micromouseAI
    */
    
    timesCalledMoveForward = 0;
    
}


var animation; //The animation interval
var timer; //Set the time interval

var paused = false; //The run is not paused

const fps = 8; //Frames per seconds
const timeInterval = 10; //The interval counter for the timer


export function pause() {
	/*
	Pause or unpause the animation
	*/
	
	paused = !paused;
	
}

export function runScript(code) {
    /*
    Run the micromouseAI script and update the graphics
    */
    
    changeMousePosition(startPos[0], startPos[1]); //Reset the position of the mouse
    mouseDir = initMouseDir; //Reset the mouse direction
    //clearInterval(animation); //Reset the animations
    
    animation = setInterval(function() {
		
		if (!paused){
		
			try{
				compile(code); //Call micromouseAI()
				document.getElementById('steps').innerHTML = 'Steps: ' + totalSteps.toString(); //Update the step counter
				resetForwardCallCount(); //Reset the forward calls variable so moveForward() can be called in the next iteration
			}
			catch(err) {
				stopScript();
				printUI('An error was raised in the code: ' + err.message, 'err');
				throw(err);
			}
			
		}
		
    }, 1000/fps);
	
	timer = setInterval(function() {
		
		if (!paused) {
		
			time += timeInterval/1000; //Update the timer
			document.getElementById('time').innerHTML = 'Time: ' + time.toFixed(2).toString();
			
		}
			
	}, timeInterval);
    
}


export function stop() {
    /*
    Clear the animation and time interval
    */
    
    clearInterval(animation);
	clearInterval(timer);
    totalSteps = 0;
	time = 0;
    resetForwardCallCount();
    finish = false;
    
}
