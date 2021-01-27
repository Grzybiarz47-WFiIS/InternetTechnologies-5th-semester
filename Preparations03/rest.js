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
    request.open('POST', "biblioteka/insert_cat", true);
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(dispatch);   
}
function insert_book(form){
    var request = getRequest();
    var book = {};
    book.tytul = form.title.value;
    book.autor = form.author.value;
    book.wydawca = form.publisher.value;
    book.id = form.id.value;
    book.kategoria = form.cat.value;
    dispatch = JSON.stringify(book);

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('POST', "biblioteka/insert_book", true);
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
    request.open('GET', "biblioteka/category", true);
    request.send(null);   
}
function select_book_by_cat(form){
    var content = document.getElementById("content");
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                content.innerHTML = request.responseText;
            }
        }
    }
    request.open('GET', "biblioteka/select_by_cat/" + form.name.value, true);
    request.send(null);   
}
function select_book_by_id(form){
    var content = document.getElementById("content");
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                content.innerHTML = request.responseText;
            }
        }
    }
    request.open('GET', "biblioteka/select_by_id/" + form.id.value, true);
    request.send(null);   
}
/////////////////////////////////////////////////////////////////////////////
function del_cat(form){
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('DELETE', "biblioteka/delete_cat/" + form.name.value, true);
    request.send(null);   
}
function del_book(form){
    var request = getRequest();

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if (request.status == 200){  
                alert(request.responseText);
            }
        }
    }
    request.open('DELETE', "biblioteka/delete_book/" + form.id.value, true);
    request.send(null);   
}

