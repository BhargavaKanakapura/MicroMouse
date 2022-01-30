function styleCode(elem) {
	/*
	Style and format code to display
	*/

}

export function styleMMAI() {
	/*
	Style the minimixed MMAI text editor
	*/
	
	styleCode(document.getElementById('mmai'));
	
}

export function styleHeader() {
	/*
	Style the minimixed header text editor
	*/
	
	styleCode(document.getElementById('header'));
	
}

export function styleMaxMMAI() {
	/*
	Style the maximixed MMAI text editor
	*/
	
	styleCode(document.getElementById('expandedmmai'));
	
}

export function styleMaxHeader() {
	/*
	Style the maximixed header text editor
	*/
	
	styleCode(document.getElementById('expandedheader'));
	
}

export function standardizeCode(codeAsText) {
	/*
	Remove all HTML tags and format as js code+
	*/
	
	//Remove comments
	let singleLineComment = /\/\/.*?\n/g;  //RegExp for // ... \n
	let multiLineComment = /\/\*.*?\*\//g; //RegExp for /* ... */
	
	//Remove HTML tags
	let htmlTag = /(<([^>]+)>)/ig;
	
	//Replace HTML entities
	let gt = '&gt;';
	let lt = '&lt;';
	let and = '&amp;';
	
	//Replace new lines
	let newLine = '\n'
	
	codeAsText = codeAsText
		.replaceAll(singleLineComment, ' ') //Replace single line comments sourrounded by // and \n
		.replaceAll(multiLineComment, ' ')  //Replace multi line comments sourrounded by /* and */
		.replaceAll(newLine, ' ')			//Replace new lines marked by \n
		.replaceAll(lt, '<')				//Replace the < HTML entity
		.replaceAll(gt, '>')				//Replace the > HTML entity
		.replaceAll(and, '&')				//Replace the & HTML entity
		.replaceAll(htmlTag, ''); 			//Remove HTML tags
	
	console.log(codeAsText);
	return codeAsText;
	
}
