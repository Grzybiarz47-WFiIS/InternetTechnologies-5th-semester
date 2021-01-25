window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var request = window.indexedDB.open("SurveyLocalBase", 1),
    db,
    tx,
    store,
    index;

request.onupgradeneeded = function(e){
    let db = request.result,
    store = db.createObjectStore("AnwserStore", {
        keyPath: ["tabela", "data_pomiaru", "lokalizacja"]
    }),
    index = store.createIndex("tabela", "tabela", {
        unique: false
    });
};

request.onerror = function(e){
    console.log("There was an error: " + e.target.errorCode);
};

request.onsuccess = function(e){
    db = e.target.result;
}; 

function saveOffline(){
    date = convertDate(new Date(document.getElementById("mdate").value));
    loc = Number(document.getElementById("mloc").value);
    type = Number(document.getElementById("mtype").value);
    val = Number(document.getElementById("mval").value);
    if(type == 0 || val == "" || loc == 0){
        document.getElementById("content").innerHTML = "<h2>Błędne lub niekompletne dane</h2>";
    }
    else{
        data = {tabela: type, lokalizacja: getLocalization(loc), data_pomiaru: date, wartosc: val};

        let tx = db.transaction(['AnwserStore'], 'readwrite');
        let store = tx.objectStore('AnwserStore');

        store.put(data);

        tx.oncomplete = function(){ 
            console.log('This is the end - data saved into database');
        };
        tx.onerror = function(e) {
            console.log("There was an error: " + e.target.errorCode);
        };
        
        document.getElementById("content").innerHTML = "<h2>Dodano rekord do lokalnej bazy</h2>";
    }
}
function readOffline(){
    cleanContent(document.getElementById("alert"));
    var table1 = document.createElement("table");
    var table2 = document.createElement("table");
    var table3 = document.createElement("table");
    let header = '<tr><td>Data pomiaru</td><td>Lokalizacja</td><td>Wartość</td></tr>'
    table1.innerHTML = '<tr><th colspan="3">' + getTableName(1) + '</th></tr>' + header;
    table2.innerHTML = '<tr><th colspan="3">' + getTableName(2) + '</th></tr>' + header;
    table3.innerHTML = '<tr><th colspan="3">' + getTableName(3) + '</th></tr>' + header;
    
    let tx = db.transaction(['AnwserStore'], 'readonly');
    let store = tx.objectStore('AnwserStore');

    let q = store.openCursor();

    q.onsuccess = function(e) {
        let cursor = e.target.result;  
        if (cursor != null) {
            res = cursor.value;
            switch(res.tabela){
                case 1:
                    table1.innerHTML += "<tr><td>" + res.data_pomiaru + "</td><td>" + res.lokalizacja + "</td><td>" + res.wartosc + "</td></tr>";
                break;
                case 2:
                    table2.innerHTML += "<tr><td>" + res.data_pomiaru + "</td><td>" + res.lokalizacja + "</td><td>" + res.wartosc + "</td></tr>";
                break;
                case 3:
                    table3.innerHTML += "<tr><td>" + res.data_pomiaru + "</td><td>" + res.lokalizacja + "</td><td>" + res.wartosc + "</td></tr>";
                break;
            }
            cursor.continue();
        } 
        else{
            let content = document.getElementById("content");
            cleanContent(content);
            content.appendChild(table1);
            content.appendChild(table2);
            content.appendChild(table3);
        }
    };
    q.onerror = function(event) {
      alert('error getting note 1 ' + event.target.errorCode);
    };
}
function extractOffline(){
    var table1 = Array();
    var table2 = Array();
    var table3 = Array();

    let tx = db.transaction(['AnwserStore'], 'readonly');
    let store = tx.objectStore('AnwserStore');

    let q = store.openCursor();

    q.onsuccess = function(e) {
        let cursor = e.target.result;  
        if (cursor != null) {
            res = cursor.value;
            switch(res.tabela){
                case 1:
                    table1.push({data_pomiaru: res.data_pomiaru, lokalizacja: res.lokalizacja, wartosc: res.wartosc});
                break;
                case 2:
                    table2.push({data_pomiaru: res.data_pomiaru, lokalizacja: res.lokalizacja, wartosc: res.wartosc});
                break;
                case 3:
                    table3.push({data_pomiaru: res.data_pomiaru, lokalizacja: res.lokalizacja, wartosc: res.wartosc});
                break;
            }
            cursor.continue();
        }
        else{
            _save(Array(table1, table2, table3));
        }
    };
    q.onerror = function(event) {
      alert('error getting note 1 ' + event.target.errorCode);
    };
}
function cleanOffline(){
    let tx = db.transaction(['AnwserStore'], 'readwrite');
    let store = tx.objectStore('AnwserStore');

    var request = store.clear();

    request.onsuccess = function(e){
        console.log('This is the end - database cleared');
    };
    request.onerror = function(e){
        console.log("There was an error: " + e.target.errorCode);
    };
}
function getLocalization(loc){
    var ans = "";
    switch(loc){
        case 1:
            ans = "Skawina";
        break;
        case 2:
            ans = "Nowa Huta";
        break;
        case 3:
            ans = "Kraków-Kurdwanów";
        break;
        default:
            ans = "ERROR";
        break;
    }
    return ans;
}
function getTableName(type){
    var ans = "";
    switch(type){
        case 1:
            ans = "Dwutlenek siarki (SO&#8322)";
        break;
        case 2:
            ans = "Dwutlenek azotu (NO&#8322)";
        break;
        case 3:
            ans = "Pył PM10";
        break;
        default:
            ans = "ERROR";
        break;
    }
    return ans;
}
//from https://stackoverflow.com/questions/32192922/how-do-i-get-a-date-in-yyyy-mm-dd-format
function convertDate(date){
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
  
    var mmChars = mm.split('');
    var ddChars = dd.split('');
  
    return yyyy + '-' + (mmChars[1] ? mm: "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
}