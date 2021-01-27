#!/usr/bin/python3

import cgi

form = cgi.FieldStorage()
req = form.getvalue("ans", "---")

if req == "list":
    f = open('../../Labs/zad01/data_save.txt', 'r')
    str_read = f.read()
    f.close()
    print ("Content-Type: text/plain")
    print ()
    print (str_read)
elif req == "form":
    f = open('../../Labs/zad01/data_save.txt', 'a')
    f.write(form.getvalue("name", "---"))
    f.write("\n")
    f.write(form.getvalue("number", "---"))
    f.write("\n")
    f.close()
    print ("Content-Type: text/plain")
    print ()
    print ("Dodano do listy")
else:
    f = open('../../Labs/zad01/data_save.txt', 'r')
    lines = f.readlines()

    result = "<tr>"
    flag = False
    count = 0
    req += "\n"
    for line in lines:
        if line == req or flag == True:
            result += "<td>" + line + "</td>"
            flag = True
            count += 1
        if count == 2:
            break;
    result += "</tr>"
    print ("Content-Type: text/plain")
    print ()
    print (result)