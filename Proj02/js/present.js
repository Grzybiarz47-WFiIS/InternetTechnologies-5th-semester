function showDocumentation(){
    window.location.href = "dokumentacja.pdf";
}
function showSurvey(){
    content = document.getElementById("content");
    cleanContent(content);
    cleanContent(document.getElementById("alert"));

    formDiv = document.createElement("div");
    formDiv.setAttribute("id", "insertForm");
    form = document.createElement("form");
    form.setAttribute("onsubmit", "saveOffline()")
    form.innerHTML = `
    <fieldset>
        <legend>Wprawadź dane pomiarowe</legend>
        <label for="mdate">Data pomiaru</label><br>
        <input type="date" id="mdate" name="mdate" min="2021-01-01" value="2021-01-30"/><br>
        <label for="mloc">Lokalizacja stacji pomiarowej</label><br>
        <select id="mloc" name="mloc">
            <option selected="selected" value="0">Wybierz</option>
            <option value="1">Skawina</option>
            <option value="2">Nowa Huta</option>
            <option value="3">Kraków-Kurdwanów</option>
        </select><br>
        <label for="mtype">Rodzaj zanieczyszczenia</label><br>
        <select id="mtype" name="mtype">
            <option selected="selected" value="0">Wybierz</option>
            <option value="1">Dwutlenek siarki (SO&#8322)</option>
            <option value="2">Dwutlenek azotu (NO&#8322)</option>
            <option value="3">Pył PM10</option>
        </select><br>
        <label for="mval">Wartość średnia</label><br>
        <input type="number" id="mval" name="mval" min="0" max="1000" /><br>
        <b>Poziomy dopuszczalne:</b><br>
        SO&#8322 - 125&mu;g/m&sup3;<br>
        NO&#8322 - 200&mu;g/m&sup3;<br>
        PM10 - 50&mu;g/m&sup3;<br>
        <input type="submit" value="Dodaj" />
    </fieldset>`;
    
    formDiv.appendChild(form);
    content.appendChild(formDiv);

    document.getElementById("mdate").setAttribute("max", convertDate(new Date()));
}
function showLogin(){
    content = document.getElementById("content");
    cleanContent(content);
    cleanContent(document.getElementById("alert"));

    formDiv = document.createElement("div");
    formDiv.setAttribute("id", "loginForm");
    form = document.createElement("form");
    form.setAttribute("onsubmit", "_login(); return false;");

    form.innerHTML = `
    <fieldset>
        <legend>Logowanie</legend>
        <label for="name">Login</label><br>
        <input type="text" id="name" name="name" /><br>
        <label for="pass">Hasło</label><br>
        <input type="password" id="pass" name="pass" /><br>
        <input type="submit" value="Zaloguj się" />
    </fieldset>`;

    formDiv.appendChild(form);
    content.appendChild(formDiv);
}
function showRegister(){
    content = document.getElementById("content");
    cleanContent(content);
    cleanContent(document.getElementById("alert"));

    formDiv = document.createElement("div");
    formDiv.setAttribute("id", "registerForm");
    form = document.createElement("form");
    form.setAttribute("onsubmit", "_register(); return false;");

    form.innerHTML = `
    <fieldset>
        <legend>Rejestracja</legend>
        <label for="name">Login</label><br>
        <input type="text" id="name" name="name" /><br>
        <label for="pass">Hasło</label><br>
        <input type="password" id="pass" name="pass" /><br>
        <input type="submit" value="Zarejestruj się" />
    </fieldset>`;

    formDiv.appendChild(form);
    content.appendChild(formDiv);
}
function showSelect(){
    content = document.getElementById("content");
    cleanContent(content);
    cleanContent(document.getElementById("alert"));

    selectDiv = document.createElement("div");
    selectDiv.setAttribute("id", "selectChart");

    selectDiv.innerHTML = `
    <fieldset>
        <legend>Wybierz rodzaj zanieczyszczeń</legend>
        <select id="schart" name="schart" onchange=_load()>
            <option selected="selected" value="0">Wybierz</option>
            <option value="1">Dwutlenek siarki (SO&#8322)</option>
            <option value="2">Dwutlenek azotu (NO&#8322)</option>
            <option value="3">Pył PM10</option>
        </select><br>
    </fieldset>`;

    content.appendChild(selectDiv);
}
function cleanContent(content){
    while(content.firstChild){
        content.removeChild(content.lastChild);
    }
}