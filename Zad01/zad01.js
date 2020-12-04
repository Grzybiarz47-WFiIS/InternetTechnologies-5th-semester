function sendRequest() {
    var url = "../../cgi-bin/zad01/zad01.cgi";
}
function sendForm() {
    var l = document.getElementById("alert");

    var name = document.getElementById("name").value;
    var lname = document.getElementById("lname").value;
    var index = document.getElementById("index").value;
    var email = document.getElementById("email").value;
    if (name == "" || lname == "" || index == "" || email == "") {
        l.innerHTML = "Pola nie moga byc puste";
        return false;
    }
    else if (email.indexOf('@') == -1) {
        l.innerHTML = "Bledny adres email";
        return false;
    }
    else if(index.length != 6){
        l.innerHTML = "Bledny indeks";
        return false;
    }
    else {
        var group = document.getElementById("group").value;
        var subject = document.getElementById("subject").value;
        if (validate(index, group, subject) == true) {
            var url = "../../cgi-bin/zad01/zad01.cgi";
            const xhr = new XMLHttpRequest();
            var ans = "?index=" + index + "&group=" + group + "&subject=" + subject + "&name=" + name + "&lname=" + lname + "&email=" + email;
            xhr.open("GET", url + ans, true);

            xhr.onload = function () {
                alert(xhr.responseText);
            }
            xhr.send();
            l.innerHTML = "Student zapisany";
            return true;
        }
        else {
            l.innerHTML = "Student nalezy juz do grupy";
            return false;
        }
    }
}
function validate(index, group, subject) {
    var url = "../../cgi-bin/zad01/check.cgi";

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url + "?index=" + index + "&group=" + group + "&subject=" + subject, true);

	var response;
    xhr.onload = function () {
        response = xhr.responseText
    }
	xhr.send();
	return true;
}