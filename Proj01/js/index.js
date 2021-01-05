var timestep = 1000;
var opLevel = 10;

function animation() {
    window.location.href = "proj01.html";
}
function documentation() {
    window.location.href = "dokumentacja.pdf";
}
function description() {
    var desc = document.getElementById("description");
    desc.style.opacity = 0.0;
    var interval = setInterval(function () { desc.style.opacity = parseFloat(desc.style.opacity) + (1.0 / opLevel); }, timestep / opLevel);
    setTimeout(function () { clearInterval(interval); }, timestep);
}