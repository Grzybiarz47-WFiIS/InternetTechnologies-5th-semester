<!DOCTYPE html>
  
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<title>Simple MVC</title>
		<?php echo $css; ?>   
		<script src="js/base.js"></script> 
		<script src="js/main.js"></script> 
	</head>
    <body>   
        <header><?php echo $header; ?></header>
		<section>
			<article id="menu"><?php echo $menu; ?></article> 
        </section>
        <section>
			<article id="content"><?php echo $content; ?></article> 
        </section>
        <footer>Techniki internetowe &copy; 2020</footer> 
    </body>
</html>
