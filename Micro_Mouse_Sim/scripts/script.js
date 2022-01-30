import {runScript, stop, pause, initMaze, unloadMazeGUI, getFPS, changeFPS} from "./modules/micromouse.js";
import {styleMMAI, styleHeader, styleMaxMMAI, styleMaxHeader, standardizeCode} from "./modules/codestyler.js"


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
				printUI('An error was logged while running: ' + err.message, 'err');
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
	Download the micromouseAI and header code as a .js file
	*/
	
	let code;
	
	if (document.getElementById('mincodeeditor').hidden) {
		code = document.getElementById('expandedmmai').innerHTML; //Get the code
	}
	else {
		code = document.getElementById('mmai').innerHTML; //Get the code
	}
	
	let downloadLink = document.createElement('a');		  //Create the hidden downloader
	
	downloadLink.href = 'data:attachment/text,' + encodeURI(code); //Encode the text
	downloadLink.target = '_blank';
	
	downloadLink.download = 'mmai.txt'; //Accessibility for computers which block .js file downloads
	
	try {
		downloadLink.click();
	}
	catch {
		alert('File could not be downloaded.');
	}
	
	if (document.getElementById('mincodeeditor').hidden) {
		code = document.getElementById('expandedheader').innerHTML; //Get the code
	}
	else {
		code = document.getElementById('header').innerHTML; //Get the code
	}
	
	downloadLink = document.createElement('a');		  //Create the hidden downloader
	
	downloadLink.href = 'data:attachment/text,' + encodeURI(code); //Encode the text
	downloadLink.target = '_blank';
	
	downloadLink.download = 'header.txt'; //Accessibility for computers which block .js file downloads
	
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
	
	let id; //Decide if the user is uplading to MMAI or header
	
	if (!document.getElementById('mincodeeditor').hidden) 
	{
		if (document.getElementById('mmai').hidden) {
			id = 'header';
		}	
		else {
			id = 'mmai';
		}
	}
	else 
	{
		if (document.getElementById('expandedmmai').hidden) {
			id = 'header';
		}
		else {
			id = 'mmai';
		}
	}
	
	reader.onload = function() {
		document.getElementById(id).innerHTML = reader.result;
		document.getElementById('expanded' + id).innerHTML = reader.result;
	};
	
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


function showSettings() {
	/*
	Show the settings
	*/
	
	document.getElementById("settings-modal").style.display = 'block';
	
}

function closeSettings() {
	/*
	Close the settings window
	*/
	
	document.getElementById("settings-modal").style.display = 'none';
	
}

function changeFontSize(change) {
	/*
	Change the font-size of the text in the text editors
	*/
	
	['mmai', 'expandedmmai', 'header', 'expandedheader'].forEach( function(e) {
		var el = document.getElementById(e);
		var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
		var fontSize = parseFloat(style);
		el.style.fontSize = (fontSize + change) + 'px';	
		document.getElementById('fontsize').innerHTML = fontSize + change;
	});
	
}

function changeAnimRate(change) {
	/*
	Change the animation rate (steps per second) of the mouse
	*/
	
	changeFPS(getFPS() + change);
	document.getElementById('animrate').innerHTML = getFPS();
	
}

//Cloase the settings modal if clicked elsewhere
window.onclick = function(event) {
	if (event.target == document.getElementById("settings-modal")) {
		closeSettings();
	}
};


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
	
});

document.getElementById('mmai').addEventListener('keyup', styleMMAI);
document.getElementById('header').addEventListener('keyup', styleHeader);
document.getElementById('expandedmmai').addEventListener('keyup', styleMaxMMAI);
document.getElementById('expandedheader').addEventListener('keyup', styleMaxHeader);


//Globalize HTML functions
window.runMainScript = runMainScript;
window.stopScript = stopScript;
window.adjustSize = initialize;
window.loadFile = loadFile;
window.download = download;
window.changeMaze = changeMaze;
window.switchView = switchView;
window.switchFile = switchFile;
window.showSettings = showSettings;
window.closeSettings = closeSettings;
window.changeFontSize = changeFontSize;
window.changeAnimRate = changeAnimRate;
