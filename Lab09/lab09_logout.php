<?php
 
function __autoload($class_name) {
    include $class_name . '.php' ;
}
 
$reg = new Register;
$reg->_logout();
$reg->_write_logout();

?>