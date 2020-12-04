#!/usr/bin/python3

import cgi

form = cgi.FieldStorage()
index = form.getvalue("index")
group = form.getvalue("group")
subject = form.getvalue("subject")
res = "T"

f = open('../../Labs/zad01/data_save.txt', 'r')
lines = f.readlines()
f.close()

for line in lines:
    array = line.split(' ')
    if array[2] == subject and array[3] == index and array[4] == group:
        res = "F"
        break

print ("Content-Type: text/plain")
print ()
print (res)
