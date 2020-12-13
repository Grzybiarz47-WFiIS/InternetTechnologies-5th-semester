<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$reg = new Register;
$reg->_login();
if($reg->_is_logged()) {
	$reg->_write_login("<h3>Zalogowano</h3><a href=\"lab09_menu.html\">Dalej<a>");
}
else {
	$reg->_write_login("<h3>Niepoprawne dane</h3><a href=\"lab09.html\">Powrót<a>");
}

?>