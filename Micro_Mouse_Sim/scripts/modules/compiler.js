/*
The purpose of this file to control which functions and variables the user can use
*/

import {
	moveForward, 
	turnRight, 
	turnLeft, 
	isWallInFront, 
	isWallLeft, 
	isWallRight, 
	corridorLength, 
	paths, 
	foundFinish, 
	resetCount
} from "./micromouse.js";

import {Graph, DirectedGraph, Tree} from "./tools/dsadvance.js";
import {Queue, equal} from "./tools/dsbasic.js";
import {printUI} from "/Micro_Mouse_Sim/sources/scripts/script.js";

export function compileHeader(code) {
	/*
	Compile the header.js file
	*/
	
	eval(code);
	
}

export function compile(code) {
	/*
	Evaluate the code
	*/
	
	eval(code);
	
}
