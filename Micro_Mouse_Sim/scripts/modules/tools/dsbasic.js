/*
* Queue implementation with
   - Fixed length
   - Fisrt In First Out (FIFO)
* Object comparison to check for equality
*/



export class Queue {
	
	constructor(maxLength=Infinity) {
		/*
		Initialize a Queue with a max length of maxLength
		*/
		
		this.values = [];
		this.maxLength = maxLength;
		
	}
	
	enqueue(values) {
		/*
		Enqueue values to the Queue. 
		Remove values if the new length of the Queue exceeds the maximum length
		*/
		
		//Add all new values to the queue
		[...arguments].forEach((e) => {
			this.values.push(e);
		});
		
		//Remove values from the front of the queue if the new lenght exceeds the maximum length
		if (this.values.length > this.maxLength) {
			this.values = this.values.slice(this.values.length - this.maxLength);
		}
	
	}
	
	dequeue() {
		/*
		Remove the element from the front of the queue, and return the element's value
		*/
		
		let value = this.at(0);
		this.values = this.values.slice(1);
		return value
		
	}
	
	includes(element) {
		/*
		check wether a certain element is stored within the queue
		*/
		
		return this.values.includes(element);
		
	}
	
	at(index) {
		/*
		Get the element at a certain index
		Return undefined if the index is out of range
		Negative indecies supported
		*/
		
		if (index >= this.values.length || index < -1 * this.values.length) {
			return undefined;
		}
		
		return this.values[index];
		
	}
	
	iterOver(f, elem=true, index=false) {
		/*
		* Iterate over the queue, and call the function f for each element
		* f can either accept the element, or index, or both, or neither, as input
		*/
		
		for (let i = 0; i < this.values.length; i++) {
			
			if (elem) {
				if (index) {
					f(this.at(i), i);
				}
				else {
					f(this.at(i));
				}
			}
			else {
				if (index) {
					f(i);
				}
				else {
					f();
				}
			}
			
		}
		
	}
	
	getLength() {
		/*
		Return the length of the queue
		*/
		
		return this.values.length;
		
	}
	
	getValues() {
		/*
		Get a list of the values
		*/
		
		return this.values;
		
	}
	
}
	
	
export function equal(x, y) {
	/*
	Check if two Objects are equal
	*/
	
    'use strict';

    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
	
    // after this just checking type of one would be enough
    if (x.constructor !== y.constructor) { return false; }
	
    // if they are functions, they should exactly refer to same one (because of closures)
    if (x instanceof Function) { return x === y; }
	
    // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
    if (x instanceof RegExp) { return x === y; }
	
    if (x === y || x.valueOf() === y.valueOf()) { return true; }
	
    if (Array.isArray(x) && x.length !== y.length) { return false; }

    // if they are dates, they must had equal valueOf
    if (x instanceof Date) { return false; }

    // if they are strictly equal, they both need to be object at least
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    // recursive object equality check
	
    var p = Object.keys(x);
	
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
        p.every(function (i) { return objectEquals(x[i], y[i]); });
	
}
