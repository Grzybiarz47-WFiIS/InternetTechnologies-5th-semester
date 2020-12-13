<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$reg = new Register;
if($reg->_is_logged()) {
	$reg->_read_user();
	$reg->_write_userdata();
}
else {
	$reg->_write_logout();
}

?>