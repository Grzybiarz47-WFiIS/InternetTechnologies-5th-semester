#!/usr/bin/python3

import cgi
form = cgi.FieldStorage()
data = form.getvalue("ans", "---")
content = []

with open('../Labs/Lab07/data_graph.txt') as f:
    line = f.read()
    numbers = line.split()
    for x in numbers:
        content.append(int(x))

if(data == "winter"):
    content[0] += 1
elif(data == "spring"):
    content[1] += 1
elif(data == "summer"):
    content[2] += 1
elif(data == "fall"):
    content[3] += 1

content_max = max(content)

f = open('../Labs/Lab07/data_graph.txt', 'w')
for x in content:
    f.write(str(x) + " ")
f.close()

print ("Content-Type: text/html")
print ()
print("<svg>")
print("<rect id=\"1\" fill=\"black\" height=\"")
print(200*content[0]/content_max)
print("\" y=\"")
print(200 - 200*content[0]/content_max)
print("\"/>")
print("</svg>")
print("<svg>")
print("<rect id=\"2\" fill=\"green\" height=\"")
print(200*content[1]/content_max)
print("\" y=\"")
print(200 - 200*content[1]/content_max)
print("\"/>")
print("</svg>")
print("<svg>")
print("<rect id=\"3\" fill=\"yellow\" height=\"")
print(200*content[2]/content_max)
print("\" y=\"")
print(200 - 200*content[2]/content_max)
print("\"/>")
print("</svg>")
print("<svg>")
print("<rect id=\"4\" fill=\"brown\" height=\"")
print(200*content[3]/content_max)
print("\" y=\"")
print(200 - 200*content[3]/content_max)
print("\"/>")
print("</svg>")
print("<div id=\"titlesDiv\">")
print("<p class=\"small\">Zima</p>")
print("<p class=\"small\">Wiosna</p>")
print("<p class=\"small\">Lato</p>")
print("<p class=\"small\">Jesien</p>")
print("</div>")

