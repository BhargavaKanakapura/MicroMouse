/*
* Additional sensor features for user:
	- Find the length of a corridor (straight section)
	- Find number of sub paths that can be taken from a square
* All functions will be secified within micromouse.js to take 0 inputs and default to mouse position, current maze, and mouse direction
* All functional inputs will be set to functions defined within micromouse.js
*/

import {convertPosToString} from "/Micro_Mouse_Sim/sources/scripts/modules/mazereader.js"


export function st_isWallInFront(mousePos, mouseDir, MAZE) {
    /*
    Check if there is a wall in front of the mouse
    */
    
    let r = mousePos[0]; //current row
    let c = mousePos[1]; //current col
    
    switch(mouseDir) {
        
        case "N": //The mouse is facing upwards
            return MAZE[convertPosToString(r, c)][0] == 1;
            break;
            
        case "S":
            return MAZE[convertPosToString(r, c)][1] == 1;
            break;
            
        case "E": //The mouse is facing right
            return MAZE[convertPosToString(r, c)][2] == 1;
            break;
            
        case "W":
            return MAZE[convertPosToString(r, c)][3] == 1;
            break;     
    }
    
}

export function st_isWallRight(mousePos, mouseDir, MAZE) {
    /*
    Check if there is a wall to the right of the mouse
    */
    
    let r = mousePos[0]; //current row
    let c = mousePos[1]; //current col
    
    switch(mouseDir) {
        
        case "N": //The mouse is facing upwards
            return MAZE[convertPosToString(r, c)][2] == 1;
            break;
            
        case "S":
            return MAZE[convertPosToString(r, c)][3] == 1;
            break;
            
        case "E": //The mouse is facing right
            return MAZE[convertPosToString(r, c)][1] == 1;
            break;
            
        case "W":
            return MAZE[convertPosToString(r, c)][0] == 1;
            break;     
    }
    
}

export function st_isWallLeft(mousePos, mouseDir, MAZE) {
    /*
    Check if there is a wall to the left of the mouse
    */
    
    let r = mousePos[0]; //current row
    let c = mousePos[1]; //current col
    
    switch(mouseDir) {
        
        case "N": //The mouse is facing upwards
            return MAZE[convertPosToString(r, c)][3] == 1;
            break;
            
        case "S":
            return MAZE[convertPosToString(r, c)][2] == 1;
            break;
            
        case "E": //The mouse is facing right
            return MAZE[convertPosToString(r, c)][0] == 1;
            break;
            
        case "W":
            return MAZE[convertPosToString(r, c)][1] == 1;
            break;     
    }
    
}

export function st_coridorLength(pos, dir, maze) {
	/*
	Get the length of the corridor in the current direction of the mouse  
	*/
	
	if (st_isWallInFront(pos, dir, maze)) {
		return 0;
	}
	
	let n_pos;
	
	switch (dir) {
			
		case "N":
			n_pos = [pos[0] - 1, pos[1]];
			return 1 + st_coridorLength(n_pos, dir, maze);
			break;
			
		case "S":
			n_pos = [pos[0] + 1, pos[1]];
			return 1 + st_coridorLength(n_pos, dir, maze);
			break;
			
		case "E":
			n_pos = [pos[0], pos[1] + 1];
			return 1 + st_coridorLength(n_pos, dir, maze);
			break;
			
		case "W":
			n_pos = [pos[0], pos[1] - 1];
			return 1 + st_coridorLength(n_pos, dir, maze);
			break;
			
	}
	
}

export function st_paths(maze, pos) {
	/*
	Get the number of paths (excluding the prior path) from the current mouse position
	*/
	
	return !st_isWallLeft(pos, "N", maze) + !st_isWallRight(pos, "N", maze) + !st_isWallInFront(pos, "N", maze);
	
}
