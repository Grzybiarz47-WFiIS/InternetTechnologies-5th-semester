<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0"/>
<xsl:param name="sortby" select="'lp'"/>
<xsl:template match="/">
    <html>
        <head>
            <link rel="stylesheet" type="text/css" href="../Labs/Lab05/lab05.css"/>
            <title>Lista produktów</title>
        </head>
        <body>
            <header>
                <h1>Lista produktów w magazynie</h1>
            </header>
            <article>
                <table>
                    <thead>
                        <tr>
                            <th>Lp.</th>
                            <th>Nazwa</th>
                            <th>Liczba</th>
                            <th>Cena</th>
                        </tr>
                    </thead>
                    <xsl:apply-templates select="storage/group"/>
                </table>
            </article>
        </body>
    </html>
</xsl:template>
<xsl:template match="group">
    <tr class = "wide_span_row">
        <td colspan="4"><xsl:value-of select="title"/></td>
    </tr>
    <xsl:choose>
        <xsl:when test="$sortby='nazwa'">
            <xsl:apply-templates select="product">
                <xsl:sort select="name"/>
            </xsl:apply-templates>
        </xsl:when>
        <xsl:when test="$sortby='liczba'">
            <xsl:apply-templates select="product">
                <xsl:sort select="number" data-type="number"/>
            </xsl:apply-templates>
        </xsl:when>
        <xsl:when test="$sortby='cena'">
            <xsl:apply-templates select="product">
                <xsl:sort select="price" data-type="number"/>
            </xsl:apply-templates>
        </xsl:when>
        <xsl:otherwise>
            <xsl:apply-templates select="product">
                <xsl:sort select="lp" data-type="number"/>
            </xsl:apply-templates>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="product">
    <tr>
        <td><xsl:value-of select="lp"/></td>
        <td><xsl:value-of select="name"/></td>
        <td><xsl:value-of select="number"/></td>
        <td><xsl:value-of select="price"/></td>
    </tr>
</xsl:template>
</xsl:stylesheet>
