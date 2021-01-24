<header>Ankieta zanieczyszczenie powietrza (tryb on-line)</header>
<div id="menu">
    <button id="insert" name="insert" onclick=showSurvey()>Wprowadź dane</button>
    <button id="show" name="show" onclick=readOffline()>Przeglądaj dane off-line</button>
    <button id="sync" name="sync" onclick=_save()>Synchronizacja danych</button>
    <button id="load" name="load" onclick=_load()>Analiza zebranych danych</button>
    <button id="docs" name="docs" onclick=showDocumentation()>Dokumentacja</button>
    <button id="logout" name="logout" onclick=_logout()>Wyloguj</button>
</div>
<div id="content"><?php echo $content ?></div>
<div id="alert"><?php echo $alert ?></div>
<footer>
    <b>Przykładowe źródło danych: <a href=http://monitoring.krakow.pios.gov.pl/stacje>Dane pomiarowe z Małopolski</a></b><br>
    Techniki internetowe 2020 Jan Zajda Projekt nr2 (tryb on-line)
</footer>