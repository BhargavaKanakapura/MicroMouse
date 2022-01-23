import {runScript, stop, pause, initMaze, unloadMazeGUI} from "./modules/micromouse.js";
import {styleCode, standardizeCode} from "./modules/codestyler.js"


document.getElementById('start').ct = 'start'; //Initialize tthe state of the start button


function runMainScript() {
    /*
    Run the micromouseAI function, or pause/play the run
    */
	
	if (document.getElementById('start').ct == 'start') { //Start the script
	
		//Format the user code
		let micromouseAI = standardizeCode(document.getElementById("mmai").innerHTML);
		let headerCode = standardizeCode(document.getElementById("header").innerHTML);

		if (micromouseAI == '') { //Empty code
			printUI('Code is empty', 'err')
		}

		else {

			//Change the Start button to the Pause/Play button
			document.getElementById('start').innerHTML = "Pause";
			document.getElementById('start').ct = 'pause';
			
			//Enable the stop script button
			document.getElementById('stop').disabled = false;
			document.getElementById('stop').style.opacity = 1.0;

			//run micromouseAI()
			try {
				runScript(headerCode, micromouseAI);
			}

			catch (err) { //Error handling
				printUI('An error was logged while running this code: ' + err.message, 'err');
				stopScript();
			}

		}
		
	}
	
	else {
		
		pause(); //Play/Resume script
		
		switch (document.getElementById('start').ct) {
				
			case "pause":
				document.getElementById('start').innerHTML = "Play";
				document.getElementById('start').ct = "play";
				break;
				
			case "play":
				document.getElementById('start').innerHTML = "Pause";
				document.getElementById('start').ct = "pause";
				break;
				
		}
		
	}
		
}


export function stopScript() {
    /*
    Stop Execution
    */
	
	//Unpause script if previously paused
	if (document.getElementById('start').ct == 'play') { //The script was paused
		pause();
	}
    
    //Disable the stop script button
    document.getElementById('stop').disabled = true;
    document.getElementById('stop').style.opacity = 0.5;
    
    //Enable the start script button
    document.getElementById('start').innerHTML = "<span>Run Script </span>";
	document.getElementById('start').ct = "start";
    
    stop();
    
}


export function printUI(msg, type='default') {
	/*
	Print a message to the user console. The message must be a string.
	*/
			
	let newErr = document.createElement('DIV');
	
	newErr.innerHTML = msg;               //Set the contents of the message
	newErr.className = 'message ' + type; //Set the formating of the message
	
	document.getElementById('console').appendChild(newErr); //Display the message on the user console
	console.log(msg); //Display the message on the server console
	
}


function initialize() {
	/*
	Resize the text editor and console
	*/
	
	initMaze();
	let height = (document.getElementById('maze').offsetHeight - document.getElementById('minnavbar').offsetHeight) + 'px';
	document.getElementById('mmai').style.height = height;
	document.getElementById('header').style.height = height;
	document.getElementById('console').style.height = (document.getElementById('statsandcontrol').offsetHeight - 40) + 'px';
	
}


function download() {
	/*
	Download the micromouseAI() function code as a .js file
	*/
	
	const code = document.getElementById('mmai').innerHTML; //Get the code
	const downloadLink = document.createElement('a');		//Create the hidden downloader
	
	downloadLink.href = 'data:attachment/text,' + encodeURI(code); //Encode the text
	downloadLink.target = '_blank';
	
	let fileName = prompt('Enter the name of the file'); //Get the file name as user input
	while (fileName == '' && fileName != null) {         //The provided file name was invalid, and the cancel button was not clicked
		fileName = prompt('Please enter a valid file name');
	}
	
	if (fileName == null) { //The cancel button was pressed
		return; //Break out of the function
	}
	
	downloadLink.download = fileName + '.js'; //Accessibility for computers which block .js file downloads
	
	try {
		downloadLink.click();
	}
	catch {
		alert('File could not be downloaded.');
	}
	
}


function loadFile(input) {
	/*
	Load a prewritten or saved code file to the text editor
	*/
	
	let file = input.files[0];
	let reader = new FileReader();
	
	reader.readAsText(file);
	
	reader.onload = function() {document.getElementById('mmai').innerHTML = reader.result;};
	reader.onerror = function() {printUI(reader.error, 'err');};
	
}


function changeMaze(maze) {
	/*
	Change the maze
	*/
	
	unloadMazeGUI();
	initMaze(parseInt(maze));
	
}


function switchView(state) {
	/*
	Switch between minimized and maximized views
	*/
	
	if (state == 0) {
		document.getElementById('mincodeeditor').hidden = true;
		document.getElementById('maxcodeeditor').hidden = false;
		document.getElementById('expandedmmai').innerHTML = document.getElementById('mmai').innerHTML;
		document.getElementById('expandedheader').innerHTML = document.getElementById('header').innerHTML;
	}
	
	else {
		document.getElementById('mincodeeditor').hidden = false;
		document.getElementById('maxcodeeditor').hidden = true;
		document.getElementById('mmai').innerHTML = document.getElementById('expandedmmai').innerHTML;
		document.getElementById('header').innerHTML = document.getElementById('expandedheader').innerHTML;
	}
	
}


function switchFile(to, loc) {
	/*
	Switch between the header and micomouseAI files
	*/
	
	if (to == 0) {
		
		if (loc == 0) {
			document.getElementById('mmai').hidden = true;
			document.getElementById('header').hidden = false;
			document.getElementById('mmaiselectormin').className = '';
			document.getElementById('headerselectormin').className = 'active';
		}
		
		else {
			document.getElementById('expandedmmai').hidden = true;
			document.getElementById('expandedheader').hidden = false;
			document.getElementById('mmaiselectormax').className = '';
			document.getElementById('headerselectormax').className = 'active';
		}
		
	}
	
	else {
		
		if (loc == 0) {
			document.getElementById('mmai').hidden = false;
			document.getElementById('header').hidden = true;
			document.getElementById('mmaiselectormin').className = 'active';
			document.getElementById('headerselectormin').className = '';
		}
		
		else {
			document.getElementById('expandedmmai').hidden = false;
			document.getElementById('expandedheader').hidden = true;
			document.getElementById('mmaiselectormax').className = 'active';
			document.getElementById('headerselectormax').className = '';
		}
		
	}
	
}

//Change key press results for text editor elements
['mmai', 'header', 'expandedmmai', 'expandedheader'].forEach(function(id) {
	
	document.getElementById(id).addEventListener('keydown', function(e) {
		/*
		Map the 'Enter' and 'Tab' keys
		*/

		switch (e.key) {

			case 'Tab':
				e.preventDefault();
				document.execCommand('insertHTML', false, '    '); //Insert a 4-space tab
				break;

			case 'Enter':
				e.preventDefault();
				document.execCommand("insertLineBreak"); //Insert a new line
				break;

		}

	});
	
	document.getElementById(id).addEventListener('keyup', styleCode); //Style code on keypress
	
});


//Globalize HTML functions
window.runMainScript = runMainScript;
window.stopScript = stopScript;
window.adjustSize = initialize;
window.loadFile = loadFile;
window.download = download;
window.changeMaze = changeMaze;
window.switchView = switchView;
window.switchFile = switchFile;

