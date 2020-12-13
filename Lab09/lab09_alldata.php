<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$reg = new Register;
if($reg->_is_logged()) {
	$reg->_write_all();
}
else {
	$reg->_write_logout();
}

?>