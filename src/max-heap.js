const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		this.insertNode(new Node(data, priority));
 		this.shiftNodeUp(new Node(data, priority));
	}

	pop() {
		
	}

	detachRoot() {
		
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		
	}

	insertNode(node) {
		// if (this.root === null)	{
		// 	this.root = node;
		// 	this.parentNodes[0] = node;
		// } else {
		// 	if (this.parentNodes[0].appendChild(node)) {
		// 		this.parentNodes.shift();
		// 	}
		// 	this.parentNodes.push(node);
		// }
	}

	shiftNodeUp(node) {
		
	}

	shiftNodeDown(node) {
		
	}
}

h = new MaxHeap();

const nodes = [
	new Node(0, 0),
	new Node(1, 1),
	new Node(2, 2),
	new Node(3, 3),
	new Node(4, 4),
	new Node(5, 5),
	new Node(6, 6),
];

nodes.forEach(node => {
	h.insertNode(node);
});

expect(h.root).to.equal(nodes[0]);
expect(h.root.left).to.equal(nodes[1]);
expect(h.root.right).to.equal(nodes[2]);
expect(h.root.left.left).to.equal(nodes[3]);
expect(h.root.left.right).to.equal(nodes[4]);

//module.exports = MaxHeap;
