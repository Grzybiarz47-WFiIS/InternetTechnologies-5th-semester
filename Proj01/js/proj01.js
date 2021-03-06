//functions triggered by buttons 

function addValue() {
    var valStr = document.getElementById("newValue").value;
    document.getElementById("newValue").value = "";
    var valInt = Number(valStr);
    if (valStr === "") {
        showAlert("Nie wpisano żadnej liczby!");
    }
    else if (!Number.isInteger(valInt)) {
        showAlert("Należy wpisać liczbę całkowitą!");
    }
    else {
        showAlert();
        if (BST === null) {
            var node = new Node(valInt);
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
    if(window.Worker) {
        var firstWorker = new Worker("js/workers/workerExample1.js");
        firstWorker.postMessage([radius, margin]);
        firstWorker.onmessage = function(e) {
            radius = e.data[0];
            margin = e.data[1];
        }
        var secondWorker = new Worker("js/workers/workerExample2.js");
        secondWorker.postMessage([fontSize, scalCounter]);
        secondWorker.onmessage = function(e) {
            fontSize = e.data[0];
            scalCounter = e.data[1];
        }
    }
    resetSVG();
}
function collapseInfo() {
    var info = document.getElementById("contentInfo");
    var interval;
    if (info.style.display == "block") {
        info.style.opacity = 1.0;
        interval = setInterval(function () { info.style.opacity = parseFloat(info.style.opacity) - (1.0 / opLevel); }, timestep / opLevel);
        setTimeout(function () { info.style.display = "none"; }, timestep);
        disableButton("collapse", 1);
    }
    else {
        info.style.opacity = 0.0;
        info.style.display = "block"; 
        interval = setInterval(function () { info.style.opacity = parseFloat(info.style.opacity) + (1.0 / opLevel); }, timestep / opLevel);
        disableButton("collapse", 1);
    }
    setTimeout(function () { clearInterval(interval); }, timestep);
}
function blobCircle(name) {
    BST.blob(name, 1);
}
function sound() {
    var sound = document.getElementById("sound");
    sound.play();
}
function mainPage() {
    window.location.href = "index.html";
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