class Node {
    constructor(data) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

export default class Tree {
    constructor(arr) {
        arr.sort();
        this.array = arr.filter((element, index) => arr.indexOf(element) === index);
        this.root = this.buildTree(0, this.array.length - 1);
    }

    getArray() {
        console.log(this.array);
    }

    buildTree(start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);

        const root = new Node(this.array[mid]);

        root.left = this.buildTree(start, mid - 1);

        root.right = this.buildTree(mid + 1, end);

        return root;
    }

    insert(value) {
        let newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this.root;
        }
        let current = this.root;
        let prev = null;
        while (current !== null) {
            prev = current;
            if (value < current.data) {
                current = current.left;
            } else if (value > current.data) {
                current = current.right;
            } else {
                return this.root;
            }
        }
        if (value < prev.value) {
            prev.left = newNode;
        } else {
            prev.right = newNode;
        }
        return this.root;
    }

    deleteItem(value, rootNode = this.root) {
        if (rootNode === null) {
            return rootNode;
        } else if (value < rootNode.data) {
            rootNode.left = this.deleteItem(value, rootNode.left);
        } else if (value > rootNode.data) {
            rootNode.right = this.deleteItem(value, rootNode.right);
        } else {
            if (rootNode.left === null && rootNode.right === null) {
                rootNode = null;
            }
            else if (rootNode.left === null) {
                rootNode = rootNode.right;
            } else if (rootNode.right === null) {
                rootNode = rootNode.left;
            }
            else {
                let temp;
                if (rootNode.right.left === null) {
                    temp = rootNode.right;
                } else {
                    temp = rootNode.right.left
                }
                rootNode.data = temp.data;
                rootNode.right = this.deleteItem(rootNode.right, temp.data);
            }
        }

        return rootNode;
    }

    find(value) {
        let current = this.root;
        while (current !== null) {
            if (current.data === value) {
                return current
            } else if (current.data < value) {
                current = current.right;
            } else {
                current = current.left;
            }
        }

        return null
    }

    levelOrder(callback) {
        if (this.root === null) {
            return;
        } else if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        }

        let queue = [];
        queue.push(this.root);

        while (queue.length !== 0) {
            const firstNode = queue[0];
            callback(firstNode.data);
            if (firstNode.left !== null) {
                queue.push(firstNode.left);
            }

            if (firstNode.right !== null) {
                queue.push(firstNode.right);
            }

            queue.shift();
        }
    }

    preOrder(callback, root = this.root) {
        if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        } else if (root === null) {
            return;
        }

        callback(root.data);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right);
    }

    inOrder(callback, root = this.root) {
        if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        } else if (root === null) {
            return;
        }

        this.inOrder(callback, root.left);
        callback(root.data);
        this.inOrder(callback, root.right);
    }

    postOrder(callback, root = this.root) {
        if (typeof callback !== "function") {
            throw new Error("A callback needs to be provided for execution");
        } else if (root === null) {
            return;
        }

        this.postOrder(callback, root.left);
        this.postOrder(callback, root.right);
        callback(root.data);
    }

    height(node) {
        if(node === null) {
            return -1;
        }

        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node) {
        let current = this.root;
        let depth = 0;

        while (current) {
            if (node.data < current.data) {
                current = current.left;
                depth++;
            } else if (node.data > current.data) {
                current = current.right
                depth++;
            } else {
                return depth;
            }
        }

        return -1;
    }

    isSubtreeBalanced(node) {
        if (node === null) {
            return true;
        }
        const leftSubtreeHeight = node.left === null ? 0 : this.height(node.left);
        const rightSubtreeHeight = node.right === null ? 0 : this.height(node.right);

        const diff = Math.abs(leftSubtreeHeight - rightSubtreeHeight);

        return diff > 1 ? false : true;
    }

    isBalanced(node) {
        if (node === null) {
            return true;
        }

        if (this.isSubtreeBalanced(node.left) && this.isSubtreeBalanced(node.right)) {
            return true;
        } else {
            return false;
        }
    }

    rebalance() {
        let treeNodeSorted = [];
        this.inOrder((value) => {
            treeNodeSorted.push(value);
        });
        this.array = treeNodeSorted;
        this.root = this.buildTree(0, this.array.length - 1);
    }
}