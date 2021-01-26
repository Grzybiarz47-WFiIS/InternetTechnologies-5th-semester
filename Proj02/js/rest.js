function getRequest(){
    if(window.ActiveXObject){
        return new ActiveXObject("Microsoft.XMLHTTP");
    } 
    else if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    } 
    else{
        return null;
    }
}
function _login(){
    var user = {"login": document.getElementById("name").value, "pass": document.getElementById("pass").value};
    dispatch = JSON.stringify(user);
    var request = getRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                if(request.responseText.trim() == 'true'){
                    sessionStorage.setItem('sessionActive', 'true');
                    _index();
                }
                else{
                    document.getElementById("alert").innerHTML = "<h2>Nie udało się zalogować</h2>"
                }
            }
            else{ 
                alert("Wystąpił błąd w czasie połączenia!");
            } 
        }
    }
    request.open('POST', "rest/login", true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(dispatch);   
}
function _register(){
    var user = {"login": document.getElementById("name").value, "pass": document.getElementById("pass").value};
    if(user.login.length > 3 && user.pass.length > 1){
        dispatch = JSON.stringify(user);
        var request = getRequest();
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                if (request.status == 200){  
                    if(request.responseText.trim() == 'true'){
                        sessionStorage.setItem('sessionActive', 'true');
                        _index();
                    }
                    else{
                        document.getElementById("alert").innerHTML = request.responseText.trim();
                    }
                }
                else{ 
                    alert("Wystąpił błąd w czasie połączenia!");
                } 
            }
        }
        request.open('POST', "rest/register", true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(dispatch);   
    }
    else{
        document.getElementById("alert").innerHTML = '<h2>Hasło lub login jest zbyt krótkie</h2>';
    }
}
function _logout(){
    var request = getRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status == 200){
                sessionStorage.setItem('sessionActive', 'false');
                location.reload();
                return false;
            }
            else{
                alert("Wystąpił błąd w czasie połączenia!");
            }
        }
    }
    request.open('DELETE', "rest/logout", true);
    request.send(null);
}
function _index(){
    if (sessionStorage.getItem('sessionActive') === null){
        sessionStorage.setItem('sessionActive', 'false');
    }
    if(sessionStorage.getItem('sessionActive') == 'true'){
        cleanContent(document.getElementById("main"));
        var request = getRequest();
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                if(request.status == 200){
                    document.getElementById("main").innerHTML = request.responseText;
                }
                else{
                    alert("Wystąpił błąd w czasie połączenia!");
                }
            }
        }
        request.open('GET', "rest/index", true);
        request.send(null);
    }
}
function _save(data){
    if(!data[0].length && !data[1].length && !data[2].length){
        document.getElementById("content").innerHTML = "<h2>Brak danych do zapisania</h2>";
    } 
    else{
        dispatch = JSON.stringify(data);
        var request = getRequest();
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                if(request.status == 200){
                    if(request.responseText.trim() == 'true'){
                        document.getElementById("content").innerHTML = "<h2>Dane zostały zapisane</h2>";
                        cleanOffline();
                    }
                    else{
                        document.getElementById("content").innerHTML = request.responseText;
                    }
                }
                else{ 
                    alert("Wystąpił błąd w czasie połączenia!");
                } 
            }
        }
        request.open('POST', "rest/save", true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(dispatch); 
    }
}
function _load(){
    var mode = Number(document.getElementById("schart").value);
    if(mode > 0){
        var request = getRequest();
        request.onreadystatechange = function(){
            if(request.readyState == 4){
                if(request.status == 200){
                    var content = document.getElementById("content");
                    while(content.firstChild != content.lastChild){
                        content.removeChild(content.lastChild);
                    }
                    document.getElementById("content").innerHTML += request.responseText;
                }
                else{
                    alert("Wystąpił błąd w czasie połączenia!");
                }
            }
        }
        request.open('POST', "rest/load", true);
        request.send(mode);
    }
}