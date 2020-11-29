#!/usr/bin/env python3
import cgi
import csv
form = cgi.FieldStorage()
firstName = form.getvalue("firstName", "---")
lastName = form.getvalue("lastName", "---")
email = form.getvalue("email", "---")
year = form.getvalue("selectYear", "---")
with open('../Labs/Lab06/table_data.csv', 'a', newline='') as file:
    writer = csv.writer(file)
    writer.writerow([str(firstName), str(lastName), str(email), str(year)])

print ("Content-type: text/html")
print ()
print ("""<!DOCTYPE html><html>
<head>
    <meta charset="UTF-8">
    <title>Zadanie JavaScript</title>
    <link rel="StyleSheet" href="../Labs/Lab06/lab06.css" type="text/css"/>
</head>
<body>
    <header>
        <form id="firstButton" action="../Labs/Lab06/lab06.html">
            <input type="submit" class="button" id="show" value="Formularz"/>
        </form>
        <form id="secondButton" action="lab06_table.py">
            <input type="submit" class="button" id="show" value="Lista osób"/>
        </form>
    </header>
    <article>""")
print("<p>Dane zapisano pomyślnie!</p>")
print("<p>Imię: " + firstName + "</p>")
print("<p>Nazwisko: " + lastName + "</p>")
print("<p>Email: " + email + "</p>")
print("<p>Rok: " + year + "</p>")
print ("</article></body></html>")
