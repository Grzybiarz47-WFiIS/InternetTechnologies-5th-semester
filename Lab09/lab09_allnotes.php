<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$note = new Note;
$reg = new Register;

if($reg->_is_logged()) {
	$note->_write_all($_SESSION['user']);
}
else {
	$reg->_write_logout();
}

?>