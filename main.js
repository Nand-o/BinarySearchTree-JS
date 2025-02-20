import Tree from "./binaryTree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const arr = [1, 5, 7, 6, 5, 1, 2];
const binaryTree = new Tree(arr);
prettyPrint(binaryTree.root);

console.log('Adding value 20');
binaryTree.insert(20);

prettyPrint(binaryTree.root);

console.log('Removing value 20');
binaryTree.deleteItem(20);

prettyPrint(binaryTree.root);

console.log()

console.log('Callback testing')
console.log('');
console.log('LevelOrder');
binaryTree.levelOrder((value) => {
    console.log(value);
});

console.log('');
console.log('preOrder');

binaryTree.preOrder((value) => {
    console.log(value);
});

console.log('');
console.log('inOrder');

binaryTree.inOrder((value) => {
    console.log(value);
});

console.log('');
console.log('postOrder');

binaryTree.postOrder((value) => {
    console.log(value);
});

console.log('');
console.log('Checking Balance or not')

console.log(binaryTree.isBalanced(binaryTree.root));



