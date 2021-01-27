#!/usr/bin/python3

import cgi

form = cgi.FieldStorage()
req = form.getvalue("ans", "---")

if req == "read":
    f = open('../../Labs/zad01/data_save.txt', 'r')
    lines = f.readlines()
    f.close()
    res = ""
    for line in lines:
        array = line.split(' ')
        res += array[0] + " "
    print ("Content-Type: text/plain")
    print ()
    print (res)
elif req == "save":
    f = open('../../Labs/zad01/data_save.txt', 'a+')
    f.write(str(form.getvalue("name")).lower() + " ")
    number = int(form.getvalue("number"))
    f.write(form.getvalue("number") + " ")
    for i in range(1, number+1):
        f.write("" + form.getvalue("x" + str(i)) + " " + form.getvalue("y" + str(i)) + " ")
    f.write("\n")
    f.close()
    print ("Content-Type: text/plain")
    print ()
    print ("Gotowe")
else:
    f = open('../../Labs/zad01/data_save.txt', 'r')
    lines = f.readlines()
    res = ""
    for line in lines:
        array = line.split(' ')
        if array[0] == req:
            for i in range(2, len(array)-1, 2):
                res += str(array[i]) + "," + str(array[i+1]) + " " 
            break;
    f.close();
    print ("Content-Type: text/plain")
    print ()
    print (res)
