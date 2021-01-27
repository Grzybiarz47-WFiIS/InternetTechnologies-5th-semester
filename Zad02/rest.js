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
/////////////////////////////////////////////////////////////////////////////
function insert_cat(form){
    var request = getRequest();
    var cat = {};
    cat.kategoria = form.name.value;
    dispatch = JSON.stringify(cat);

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('POST', "zadania/insert_cat", true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(dispatch);   
}
function insert_task(form){
    var request = getRequest();
    var task = {};

    task.kategoria = form.cat.value;
    task.tytul = form.title.value;
    task.tresc = form.con.value;
    task.data_start = form.start.value;
    task.data_koniec = form.end.value;
    task.status = form.status.value;

    dispatch = JSON.stringify(task);

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('POST', "zadania/insert_task", true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(dispatch);   
}
/////////////////////////////////////////////////////////////////////////////
function list_cat(){
    var content = document.getElementById("content");
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                content.innerHTML = request.responseText;
            }
        }
    }
    request.open('GET', "zadania/list_cat", true);
    request.send(null);   
}
function select_by_cat(form){
    var content = document.getElementById("content");
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                content.innerHTML = request.responseText;
            }
        }
    }
    request.open('GET', "zadania/select_by_cat/" + form.cat.value, true);
    request.send(null);   
}
function select_by_id(form){
    var content = document.getElementById("content");
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                content.innerHTML = request.responseText;
            }
        }
    }
    request.open('GET', "zadania/select_by_id/" + form.id.value, true);
    request.send(null);   
}
/////////////////////////////////////////////////////////////////////////////
function del_task(form){
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('DELETE', "zadania/delete_task/" + form.id.value, true);
    request.send(null);   
}
function del_rec(id){
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('DELETE', "zadania/delete_task/" + id, true);
    request.send(null);   
}
/////////////////////////////////////////////////////////////////////////////
function update_show(id){
    var task_form = `
    <form action="#">
        <fieldset>
            <legend>Dodaj zadanie</legend>
            Tytuł
            <input type="text" id="title" name="title" /><br>
            Kategoria
            <input type="text" id="cat" name="cat" /><br>
            Status
            <input type="text" id="status" name="status" /><br>
            Treść
            <input type="text" id="con" name="con" /><br>
            Data wprowadzenia
            <input type="date" id="start" name="start" /><br>
            Data zakończenia
            <input type="date" id="end" name="end" /><br>
            <input type="button" value="Wyślij" onclick=update_task(this.form,` + String(id) +  ") /> </fieldset></form>";

    document.getElementById("content").innerHTML = task_form;
}
function update_task(form , id){
    var request = getRequest();
    var task = {};

    task.id = id;
    task.kategoria = form.cat.value;
    task.tytul = form.title.value;
    task.tresc = form.con.value;
    task.data_start = form.start.value;
    task.data_koniec = form.end.value;
    task.status = form.status.value;

    dispatch = JSON.stringify(task);

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
                document.getElementById("content").innerHTML = '';
            }
        }
    }

    request.open('PUT', "zadania/update_task", true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(dispatch);   
}
