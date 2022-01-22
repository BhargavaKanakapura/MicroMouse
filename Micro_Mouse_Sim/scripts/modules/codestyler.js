const conditionals = ['if', 'else', 'switch', 'case', 'try', 'catch', 'throw', 'finally'];
const declarations = ['var', 'let', 'const', 'function', 'class'];
const keywords = ['this', 'window', 'async', 'true', 'false', 'undefined', 'for', 'while', 'continue'];
const separators = ['(', ')', '!', '?', '$', '#', ':', '{', '}', ';', '?', '+', '-', '*', '/', ',', '.', '^', '&', '|', '[', ']', '=', '<', '>', ' '];


export function styleCode() {
	/*
	Style and format code to display
	*/
	
	let text = document.getElementById('mmai').innerHTML;
	//console.log(text);
	
}

export function standardizeCode(codeAsText) {
	/*
	Remove all HTML tags and format as js code+
	*/
	
	return codeAsText
		.replaceAll('\n', ' ')   //Replace new lines
		.replaceAll('&lt;', '<') //Replace HTML chars
		.replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&')
		.replaceAll(/(<([^>]+)>)/ig, ''); //Remove HTML tags
	
}
