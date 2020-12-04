#!/usr/bin/python3

import cgi

form = cgi.FieldStorage()
name = form.getvalue("name")
lname = form.getvalue("lname")
subject = form.getvalue("subject")
index = form.getvalue("index")
group = form.getvalue("group")
email = form.getvalue("email")

f = open('../../Labs/zad01/data_save.txt', 'a+')
f.write(name + " " + lname + " " + subject + " " + index + " " + group + " " + email + "\n")
f.close()

print ("Content-Type: text/plain")
print ()
print ("Zapisano")





