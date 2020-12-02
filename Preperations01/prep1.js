function sendRequest(data)
{
    var url = "../../cgi-bin/zad01/prep1.cgi";
    var ans = data;
    var l = document.getElementById("insert");

    url += "?ans=" + ans;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onload = function () {
        response = xhr.responseText;
        l.innerHTML = "<table><thead><tr><th>Nazwa</th><th>Mieszkańcy</th></tr></thead>" + response + "</table>";
    };
    xhr.send();
}
function sendForm()
{
    var url = "../../cgi-bin/zad01/prep1.cgi";
    var ans = "form";
    var name = document.getElementById("name").value;
    var number = document.getElementById("number").value;
    if (number != "" || number != "") {
        url += "?ans=" + ans + "&name=" + name + "&number=" + number;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
    }
}
function loadList()
{
	var url = "../../cgi-bin/zad01/prep1.cgi";
	var ans = "list";
	var l = document.getElementById("list");

	url += "?ans=" + ans;
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
    
	xhr.onload = function () { 
        var response = xhr.responseText;
        var array = [];
        array = response.split('\n');

        for(var i = 0; i < array.length-2; i+=2)
		{
		    var x = array[i];
		    l.innerHTML += "<input type=\"button\" class=\"region\" onclick=sendRequest(\"" + x + "\") value=" + x + "><p></p>";
		}
    }
	xhr.send();
}
function showForm()
{
	document.getElementById("insert").innerHTML = 
	`<form id=\"insertForm\" onSubmit=\"sendForm()\">
		<p>Województwo</p>
    	<input type=\"text\" id=\"name\"/>
 		<p>Liczba mieszkańców</p>
	    <input type=\"text\" id=\"number\"/>
		<p></p>
		<input type=\"submit\" id=\"submitButton" value=\"Wyślij\"/>
    </form>`;
}
