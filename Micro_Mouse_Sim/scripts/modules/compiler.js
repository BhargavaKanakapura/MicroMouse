/*
The purpose of this file to strictly control which functions and variables the user can use
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

import {Graph} from "./tools/dsgraph.js";
import {Queue} from "./tools/dsqueue.js";
import {printUI} from "/Micro_Mouse_Sim/sources/scripts/script.js"

export function compile(code) {
	/*
	Evaluate the code
	*/
	
	eval(code);
	
}
