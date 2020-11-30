function sendRequest() {
    var ans = "";
    var url = "../../cgi-bin/lab07.py";
    if (document.getElementById("winter").checked == true)
        ans = "winter";
    else if (document.getElementById("spring").checked == true)
        ans = "spring";
    else if (document.getElementById("summer").checked == true)
        ans = "summer";
    else if (document.getElementById("fall").checked == true)
        ans = "fall";
    else
        document.getElementById("alertDiv").innerHTML = "Nie wybrano opcji!";

    if (ans != "") {
        document.getElementById("alertDiv").innerHTML = "";

		const xhr = new XMLHttpRequest();
        var data = encodeURI("ans=" + ans);
		var graph = document.getElementById("graphDiv");
		url += "?ans=" + ans;
		
		xhr.open("GET", url, true);
 	  	xhr.addEventListener("load", e => {
    	if ( xhr.status == 200 )  {
				graph.innerHTML = xhr.responseText;
    		}
  		})
		
        xhr.send(data);
		document.getElementById(ans).checked = false;
    }
}