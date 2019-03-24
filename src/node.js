class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
			return false;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
			return true;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;			
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;			
		} else {
			throw new Error('Passed node is not a child of this node');		
		}
	}

	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent !== null) {
			let swapParent = this.parent;

			this.parent = swapParent.parent;

			if (swapParent.parent !== null) {
				if (swapParent.parent.left === swapParent) {
					swapParent.parent.left = this;
				} else {
					swapParent.parent.right = this;
				}
			}

			swapParent.parent = this;

			if (swapParent.left === this) {
				let brother = swapParent.right;

				swapParent.left = this.left;	
        if (this.left !== null)	this.left.parent = swapParent;
				this.left = swapParent;

				swapParent.right = this.right;
				if (this.right !== null) this.right.parent = swapParent;
				this.right = brother;				
				if (brother !== null) brother.parent = this;

			} else {
				let brother = swapParent.left;

				swapParent.right = this.right;
				if (this.right !== null) this.right.parent = swapParent;
				this.right = swapParent;

				swapParent.left = this.left;
				if (this.left !== null) this.left.parent = swapParent;
				this.left = brother;
				if (brother !== null)brother.parent = this;

			}
		}
	}
}

module.exports = Node;