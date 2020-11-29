#!/usr/bin/env python3
import csv

content = """<table><thead><tr>
<th>Imię</th>
<th>Nazwisko</th>
<th>Email</th>
<th>Rok</th>
</tr></thead>"""

with open('../Labs/Lab06/table_data.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        content += "<tr>"
        content += "<td>" + row["first_name"] + "</td>"
        content += "<td>" + row["last_name"] + "</td>"
        content += "<td>" + row["email"] + "</td>"
        content += "<td>" + row["year"] + "</td>"
        content += "</tr>"

content += "</table>"

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
    </header>""")
print(content)
print ("</body></html>")
