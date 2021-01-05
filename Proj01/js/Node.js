class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
    setPos(x, y, row) {
        this.x = x;
        this.y = y;
        this.row = row;
    }
}