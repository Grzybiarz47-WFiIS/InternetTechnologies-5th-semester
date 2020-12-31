//global parameters

const xmlns = "http://www.w3.org/2000/svg";
const width = 800;
const height = 600;
const scal = 5;
const timestep = 750;
const y0 = 60;

var BST = null;
var radius = 30;
var margin = 40;
var fontSize = 20;
var scalCounter = 0;

///////////////////////////

//classes

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
class Tree {
    constructor(node) {
        this.root = node;
        this.drawCircle(node);
        this.drawText(node);
    }
    addNode(node) {
        var x = this.root;
        var arr = new Array();
        while (true) {
            arr.push(this.buildCompare(node, x));
            if (node.val < x.val) {
                if (x.left == null) {
                    x.left = node;
                    node.row = x.row + 1;
                    node.y = x.y + margin * 2;
                    node.x = x.x - width / Math.pow(2, node.row + 1);
                    break;
                }
                else {
                    x = x.left;
                }
            }
            else {
                if (x.right == null) {
                    x.right = node;
                    node.row = x.row + 1;
                    node.y = x.y + margin * 2;
                    node.x = x.x + width / Math.pow(2, node.row + 1);
                    break;
                }
                else {
                    x = x.right;
                }
            }
        }
        if (node.row > 7) {
            showAlert("Przekroczono maksymaln¹ wysokoœæ drzewa!")
            return;
        }
        if ((node.x + radius > width || node.x - radius < 0 || node.y + radius > height)) {
            ++scalCounter;
            radius = radius - scal * 2;
            margin = margin - scal;
            fontSize = fontSize - scal;
            resetSVG();
            this.root.y = margin;
            this.drawCircle(this.root);
            this.drawText(this.root);
            if (this.root.left != null) {
                this.rescale(this.root, this.root.left, false, node);
            }
            if (this.root.right != null) {
                this.rescale(this.root, this.root.right, true, node);
            }
            arr.forEach(this.rescaleCompare);
        }
        this.drawLine(x, node, arr.length)
        this.drawCircle(node, arr.length);
        this.drawText(node, arr.length);
        arr.forEach(this.showCompare);
        disableButton("toAddValue", arr.length);
        disableButton("toReset", arr.length);
    }
    drawCircle(node, time = 0) {
        let newElement = document.createElementNS(xmlns, "circle");
        let name = "circle" + node.x + node.y;
        newElement.setAttribute("fill", "#f57542");
        newElement.setAttribute("cx", node.x);
        newElement.setAttribute("cy", node.y);
        newElement.setAttribute("r", radius);
        newElement.setAttribute("stroke", "#30302c");
        newElement.setAttribute("id", name);
        newElement.setAttribute("onmouseover", "blobCircle(\"" + name + "\")");
        if (scalCounter == 1) {
            newElement.setAttribute("stroke-width", "3");
        }
        else if (scalCounter == 2) {
            newElement.setAttribute("stroke-width", "1");
        }
        else {
            newElement.setAttribute("stroke-width", "5");
        }
        setTimeout(function () { document.getElementById("svgBoard").appendChild(newElement); }, time * timestep);
    }
    drawText(node, time = 0) {
        let newElement = document.createElementNS(xmlns, "text");
        let name = "text" + node.x + node.y;
        newElement.setAttribute("x", node.x);
        newElement.setAttribute("y", node.y);
        newElement.setAttribute("text-anchor", "middle");
        newElement.setAttribute("font-size", "" + fontSize + "px");
        newElement.setAttribute("id", name);
        newElement.innerHTML = node.val;
        setTimeout(function () { document.getElementById("svgBoard").appendChild(newElement); }, time * timestep);
    }
    drawLine(node1, node2, time = 0) {
        let newElement = document.createElementNS(xmlns, "line");
        newElement.setAttribute("x1", node1.x);
        newElement.setAttribute("y1", node1.y);
        newElement.setAttribute("x2", node2.x);
        newElement.setAttribute("y2", node2.y);
        if (scalCounter == 2) {
            newElement.setAttribute("style", "stroke:rgb(0,0,0); stroke-width:2");
        }
        else {
            newElement.setAttribute("style", "stroke:rgb(0,0,0); stroke-width:1");
        }
        let svg = document.getElementById("svgBoard");
        setTimeout(function () { svg.insertBefore(newElement, svg.firstChild); }, time * timestep);
    }
    rescale(parent, node, flag, curNode) {
        node.y = parent.y + 2 * margin;
        if (flag == true) {
            node.x = node.x - scal;
        }
        else {
            node.x = node.x + scal;
        }
        if (node != curNode) {
            this.drawLine(parent, node)
            this.drawCircle(node);
            this.drawText(node);
        }
        if (node.left != null) {
            this.rescale(node, node.left, false, curNode);
        }
        if (node.right != null) {
            this.rescale(node, node.right, true, curNode);
        }
    }
    buildCompare(node1, node2) {
        let newElement = document.createElementNS(xmlns, "text");
        newElement.setAttribute("x", node2.x);
        newElement.setAttribute("y", node2.y + margin);
        newElement.setAttribute("text-anchor", "middle");
        newElement.setAttribute("font-size", "" + fontSize + "px");
        if (node1.val == node2.val) {
            newElement.innerHTML = "" + node1.val + " == " + node2.val;
            newElement.setAttribute("fill", "blue");
        }
        else if (node1.val > node2.val) {
            newElement.innerHTML = "" + node1.val + " > " + node2.val;
            newElement.setAttribute("fill", "green");
        }
        else {
            newElement.innerHTML = "" + node1.val + " < " + node2.val;
            newElement.setAttribute("fill", "red");
        }
        return newElement;
    }
    rescaleCompare(item, index) {
        item.setAttribute("y", item.getAttribute("y") - 2 * (index + 1) * scal);
        item.setAttribute("font-size", "" + fontSize + "px");
    }
    showCompare(item, index) {
        var svg = document.getElementById("svgBoard");
        setTimeout(function () { svg.appendChild(item); }, index * timestep);
        setTimeout(function () { svg.removeChild(item); }, (index + 1) * timestep);
    }
}

///////////////////////////

//functions triggered by buttons 

function addValue() {
    var valStr = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var valInt = Number(valStr);
    if (valStr == "") {
        showAlert("Nie wpisano ¿adnej liczby!");
    }
    else if (!Number.isInteger(valInt)) {
        showAlert("Nale¿y wpisaæ liczbê ca³kowit¹!");
    }
    else {
        showAlert();
        if (BST == null) {
            var node = new Node(valInt)
            node.setPos(width / 2, y0, 0);
            BST = new Tree(node);
        }
        else {
            BST.addNode(new Node(valInt));
        }
    }    
}
function reset() {
    BST = null;
    radius = 30;
    margin = 40;
    fontSize = 20;
    scalCounter = 0;
    resetSVG()
}
function collapseInfo() {
    var info = document.getElementById("contentInfo");
    if (info.style.display == "block") {
        info.style.display = "none";
    }
    else {
        info.style.display = "block";
    }
}

///////////////////////////

//other functions

function resetSVG() {
    var svg = document.getElementById("svgBoard");
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}
function showAlert(info = "") {
    var alert = document.getElementById("alert");
    alert.innerHTML = info;
}
function disableButton(button, time) {
    document.getElementById(button).disabled = true;
    setTimeout(function () { document.getElementById(button).disabled = false; }, time * timestep);
}
function blobCircle(name){
    var elem = document.getElementById(name);
    var textName = "text" + name.substring(6, name.length);
    var textElem = document.getElementById(textName);
    elem.setAttribute("r", 1.5 * radius);
    elem.setAttribute("stroke", "green");
    textElem.setAttribute("font-size", "" + (1.5 * fontSize) + "px");
    setTimeout(function () {
        elem.setAttribute("r", radius);
        elem.setAttribute("stroke", "#30302c");
        textElem.setAttribute("font-size", "" + fontSize + "px");
    }, timestep);
}