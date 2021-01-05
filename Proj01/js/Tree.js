class Tree {
    constructor(node) {
        this.root = node;
        this.draw(this.root);
    }
    addNode(node) {
        var x = this.root;
        var arr = new Array();
        while (true) {
            arr.push(this.buildCompare(node, x));
            if (node.val < x.val) {
                if (x.left === null) {
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
                if (x.right === null) {
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
            showAlert("Przekroczono maksymaln� wysoko�� drzewa!");
            return;
        }
        if ((node.x + radius > width || node.x - radius < 0 || node.y + radius > height)) {
            ++scalCounter;
            radius = radius - scal * 2;
            margin = margin - scal;
            fontSize = fontSize - scal;
            resetSVG();
            this.root.y = margin;
            this.draw(this.root);
            if (this.root.left !== null) {
                this.rescale(this.root, this.root.left, false, node);
            }
            if (this.root.right !== null) {
                this.rescale(this.root, this.root.right, true, node);
            }
            arr.forEach(this.rescaleCompare);
        }
        this.draw(node, x, arr.length);
        arr.forEach(this.showCompare);
        disableButton("toAddValue", arr.length);
        disableButton("toReset", arr.length);
        onMouseOver = false;
        setTimeout(function () { onMouseOver = true; }, arr.length * timestep);
    }
    draw(node, parent = null, time = 0) {
        if (parent !== null) {
            this.drawLine(parent, node, time);
        }
        this.drawCircle(node, time);
        this.drawText(node, time);
    }
    blob(name, time) {
        if (onMouseOver === false)
            return;
        var svg = document.getElementById("svgBoard");
        var elem = document.getElementById(name);
        var textName = "text" + name.substring(6, name.length);
        var textElem = document.getElementById(textName);
        elem.setAttribute("r", 1.5 * radius);
        elem.setAttribute("stroke", "green");
        textElem.setAttribute("font-size", "" + (1.5 * fontSize) + "px");
        svg.removeChild(elem);
        svg.removeChild(textElem);
        svg.appendChild(elem);
        svg.appendChild(textElem);
        setTimeout(function () {
            elem.setAttribute("r", radius);
            elem.setAttribute("stroke", "#30302c");
            textElem.setAttribute("font-size", "" + fontSize + "px");
            sound.innerHTML = "";
        }, time * timestep);
    }
    drawCircle(node, time) {
        let newElement = document.createElementNS(xmlns, "circle");
        let name = "circle" + node.x + node.y;
        newElement.setAttribute("fill", "#f57542");
        newElement.setAttribute("cx", node.x);
        newElement.setAttribute("cy", node.y);
        newElement.setAttribute("r", radius);
        newElement.setAttribute("stroke", "#30302c");
        newElement.setAttribute("id", name);
        newElement.setAttribute("onmouseover", "blobCircle(\"" + name + "\")");
        newElement.setAttribute("onclick", "sound()");
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
    drawText(node, time) {
        let newElement = document.createElementNS(xmlns, "text");
        let name = "text" + node.x + node.y;
        newElement.setAttribute("x", node.x);
        newElement.setAttribute("y", node.y);
        newElement.setAttribute("text-anchor", "middle");
        newElement.setAttribute("font-size", "" + fontSize + "px");
        newElement.setAttribute("id", name);
        newElement.innerHTML = node.val;
        newElement.setAttribute("onclick", "sound()");
        setTimeout(function () { document.getElementById("svgBoard").appendChild(newElement); }, time * timestep);
    }
    drawLine(node1, node2, time) {
        let newElement = document.createElementNS(xmlns, "line");
        newElement.setAttribute("x1", node1.x);
        newElement.setAttribute("y1", node1.y);
        newElement.setAttribute("x2", node2.x);
        newElement.setAttribute("y2", node2.y);
        if (scalCounter == 2) {
            newElement.setAttribute("style", "stroke:rgb(0,0,0); stroke-width:1");
        }
        else {
            newElement.setAttribute("style", "stroke:rgb(0,0,0); stroke-width:2");
        }
        let svg = document.getElementById("svgBoard");
        setTimeout(function () { svg.insertBefore(newElement, svg.firstChild); }, time * timestep);
    }
    rescale(parent, node, flag, curNode) {
        node.y = parent.y + 2 * margin;
        if (flag === true) {
            node.x = node.x - scal;
        }
        else {
            node.x = node.x + scal;
        }
        if (node != curNode) {
            this.draw(node, parent);
        }
        if (node.left !== null) {
            this.rescale(node, node.left, false, curNode);
        }
        if (node.right !== null) {
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