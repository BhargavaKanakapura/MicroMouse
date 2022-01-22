/*
* Queue implementation with
   - Fixed length
   - Fisrt In First Out (FIFO)
* Values must be specified as array object
*/

export class Queue {
	
	constructor(values, maxLength = false) {
		/*
		Construct empty queue with no specified max length or prior values
		*/
		
		this.values = values;
		this.length = values.length;
		this.maxLength = maxLength;
		
	}
	
	enqueue(values) {
		/*
		Add a new item to the top of the queue and remove the bottom item if necessary
		*/
		
		for (let i = 0; i < arguments.length; i++) {
			
			this.values.push(arguments[i]);
			this.length ++;
			
			if (this.isOverflow()) {
				this.dequeue();
			}
			
		}
	}
	
	dequeue() {
		/*
		FIFO dequeue; remove first item inserted into queue
		*/
		
		this.values = this.values.slice(1);
		this.length --;
		
	}
	
	isEmpty() {
		/*
		Check if no values are stored in the queue
		*/
		
		return this.length == 0;
		
	}
	
	isFull() {
		/*
		Check if the length of the queue is maximized by the maxValue parameter.
		Return false if no maxLength is specified
		*/
		
		return this.maxLength != false && this.length == this.maxLength;
		
	}
	
	isOverflow() {
		/*
		Check if the length of the queue is excedes maxValue parameter.
		Return false if no maxLength is specified
		*/
		
		return this.maxLength != false && this.length > this.maxLength;
		
	}
	
	changeMaxLenght(length) {
		/*
		Change the maxLength of the queue, and remove elements if necessary
		*/
		
		this.maxLength = length;
		const currLength = this.length; //Temporarily store the original length of the queue
		
		//Remove elements if the current length of the list exceeds the maximum length
		for (let i = 0; i < Math.max(currLength - this.maxLength, 0); i++) {
			this.dequeue();
		}
		
	}
	
	sameAs(queue) {
		/*
		Check if two queues have the same stored values
		*/
		
		return queue.values.toString() == this.values.toString();
		
	}
	
}
