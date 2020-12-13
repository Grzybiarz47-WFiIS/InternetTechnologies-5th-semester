<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$reg = new Register;
$reg->_read();
if($reg->_validate()) {
	$reg->_write_reg('<h3>'. $reg->_save() .'</h3>');
}
else {
	$reg->_write_reg('<h3>Niepoprawne dane</h3>');
}

?>