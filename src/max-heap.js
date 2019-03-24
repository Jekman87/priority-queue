const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const newNode = new Node(data, priority);
		this.insertNode(newNode);
 		this.shiftNodeUp(newNode);
	}

	pop() {
		if (this.root !== null)	{
			let detach = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detach);
			this.shiftNodeDown(this.root);
			return detach.data;
		}
	}

	detachRoot() {
		let indexNode = this.parentNodes.indexOf(this.root);		
		if (~indexNode) this.parentNodes.shift();
		let root = this.root;
		this.root = null;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length === 0 || Object.keys(detached).length === 0) return;
		
		let lastNode = this.parentNodes[this.parentNodes.length-1];
		
		if (lastNode.parent.left === lastNode) {
			lastNode.parent.left = null;
		} else {
			lastNode.parent.right = null;
		}
		lastNode.parent = null;
		
		if (detached.left !== null) {
			detached.left.parent = lastNode;
			lastNode.left = detached.left;
		}
		if (detached.right !== null) {
			detached.right.parent = lastNode;
			lastNode.right = detached.right;
		}
		this.root = lastNode;

		if (lastNode.left !== null) {
			this.parentNodes.pop();
			let newLastNode = this.parentNodes[this.parentNodes.length-1];
			if (newLastNode.parent.left === newLastNode) {
				this.parentNodes.unshift(newLastNode.parent);
			}
		}
		
		
	}

	size() {
		if (this.parentNodes.length === 0) return 0;
		let lastNode = this.parentNodes[this.parentNodes.length-1];

		if (lastNode.parent !== null && lastNode.parent.left === lastNode) {
			return this.parentNodes.length * 2 - 2;
		} else {
			return this.parentNodes.length * 2 - 1;
		}
	}

	isEmpty() {
		if (this.root === null)	return true;
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root === null)	{
			this.root = node;
			this.parentNodes[0] = node;
		} else {
			if (this.parentNodes[0].appendChild(node)) {
				this.parentNodes.shift();
			}
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		if (node.parent !== null && node.priority > node.parent.priority) {
			
			let indexNode = this.parentNodes.indexOf(node);
			let indexParent = this.parentNodes.indexOf(node.parent);
			
			if (~indexNode) this.parentNodes[indexNode] = node.parent;
			if (~indexParent) this.parentNodes[indexParent] = node;

			node.swapWithParent();			
			this.shiftNodeUp(node);
		}
		if (this.root.priority < node.priority) this.root = node;
	}

	shiftNodeDown(node) {
		if (node === null) return;
		if ((node.left !== null && node.priority < node.left.priority) || 
				(node.right !== null && node.priority < node.right.priority)) {
			let child;

			if (node.right === null || (node.left.priority > node.right.priority)) {
				child = node.left;
			} else {
				child = node.right;
			}

			let indexChild = this.parentNodes.indexOf(child);
			let indexNode = this.parentNodes.indexOf(node);
			
			if (~indexChild) this.parentNodes[indexChild] = node;
			if (~indexNode) this.parentNodes[indexNode] = child;
			if (this.root.priority < child.priority) this.root = child;

			child.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;