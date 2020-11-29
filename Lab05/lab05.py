#!/usr/bin/env python3
import os
from lxml import etree
xmlfile = open('../Labs/Lab05/lab05.xml')
xslfile = open('../Labs/Lab05/lab05.xsl')
xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)
transform = etree.XSLT(xsldom)
query = os.environ.get('QUERY_STRING')
query = query.lower()
result = transform(xmldom, sortby=etree.XSLT.strparam(query))
print ('Content-Type: text/html')
print ()
print (result)
