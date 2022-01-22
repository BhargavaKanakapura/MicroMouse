var MAZE;

export function initReader(maze) {

	let xhttp = new XMLHttpRequest();

	xhttp.onload = function() {
		MAZE = this.response.split('\n');
	};

	xhttp.open("GET", "sources/maze/testmazes/maze" + maze.toString() + ".maz", false);
	xhttp.send();
	
}

function strToList(str) {
    return str.split(' ').map(function(e) {return parseInt(e)});
}

export function convertPosToString(r, c) {
    return r.toString() + ' ' + c.toString() 
}

export function getRows() {
    return strToList(MAZE[0])[0];
}

export function getCols() {
    return strToList(MAZE[0])[1];
}

export function getPos() {
    return strToList(MAZE[1]);
}

export function getDir() {
    return MAZE[2];
}

export function getEndPoints() {
    return MAZE.slice(3, 7).map(function(e) {return strToList(e);});
}

export function readMaze() {
    
    let mazeDict = {};
    
    MAZE.slice(7).forEach( function(line) {
		line = strToList(line)
        mazeDict[convertPosToString(line[0], line[1])] = line.slice(2);
    })
    
    return mazeDict;
    
}

