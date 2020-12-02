function showForm() {
    var l = document.getElementById("formShape");
    l.innerHTML = `<form action="#" onSubmit="sendForm()">
                   <h3>Parametry</h3>
                   <p>Nazwa figury
                   <input type="text" id="name"></p>
                   <p>Liczba wierzcho³ków
                   <input type="text" id="number"></p>
                   <h3>Wspó³rzêdne wiercho³ków</h3>
                   <p>Wspó³rzêdna X i Wspó³rzêdna Y</p>
                   <input type="text" id="x1">
                   <input type="text" id="y1">
                   <p></p>
                   <input type="text" id="x2">
                   <input type="text" id="y2">
                   <p></p>
                   <input type="text" id="x3">
                   <input type="text" id="y3">
                   <p></p>
                   <input type="text" id="x4">
                   <input type="text" id="y4">
                   <p></p>
                   <input type="text" id="x5">
                   <input type="text" id="y5">
                   <p></p>
                   <input type="submit" value="Wyœlij"/>
                   </form>`
}
function showList()
{
    var url = "../../cgi-bin/zad01/prep2.cgi";
    var ans = "read";
    var l = document.getElementById("formShape");
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "?ans=" + ans, true);
    xhr.onload = function () {
        var response = xhr.responseText;
        var array = [];
        var res = "";
        array = response.split(' ');
        
        for(var i = 0; i < array.length-1; i++)
            res += "<input type=\"button\" value=\"" + array[i] + `"onclick=sendRequest("` + array[i] + `") ><p></p>`;

        l.innerHTML = res;
    }
    xhr.send();
}
function sendForm()
{
    var url = "../../cgi-bin/zad01/prep2.cgi";
    var name = document.getElementById("name").value;
    var number = parseInt(document.getElementById("number").value, 10);
    var ans = "save";
    var arrayX = [];
    var arrayY = [];
    for (var i = 1; i <= number; ++i)
        arrayX.push(document.getElementById("x" + i).value);
    for (var i = 1; i <= number; ++i)
        arrayY.push(document.getElementById("y" + i).value);

    url += "?ans=" + ans + "&name=" + name + "&number=" + number;
    for (var i = 1; i <= number; ++i)
        url += "&x" + i + "=" + arrayX[i - 1] + "&y" + i + "=" + arrayY[i - 1];
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        alert(xhr.responseText);
    }
    xhr.send();
}
function sendRequest(data)
{
    var url = "../../cgi-bin/zad01/prep2.cgi";
    var ans = data;
    var l = document.getElementById("screen");

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "?ans=" + ans, true);
    xhr.onload = function () {
        var response = xhr.responseText;
        l.innerHTML = `<svg><polygon points="` + response + `" /></svg>`;
    }
    xhr.send();
}