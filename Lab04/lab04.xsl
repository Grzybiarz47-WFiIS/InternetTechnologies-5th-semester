<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0"  />

<xsl:template match="/">
    <html>
        <head>
            <link rel="stylesheet" type="text/css" href="lab04.css" />
            <title>Transformacja XSLT</title>
        </head>
        <body>
            <header>
                <h1>Transformacja XSLT</h1>
            </header>
            <xsl:apply-templates select="labs" />
        </body>
    </html>
</xsl:template>
<xsl:template match="labs">

    <ul>
        <xsl:for-each select="lab" >
            <li><xsl:value-of select="title" /></li>
        </xsl:for-each>
    </ul>
    <xsl:apply-templates select="lab" />

</xsl:template>
<xsl:template match="lab">

    <h2><xsl:value-of select="title" /></h2>
    <p><xsl:value-of select="description" /></p>
    <article>
        <xsl:value-of select="code"/>
    </article>

</xsl:template>
</xsl:stylesheet>

