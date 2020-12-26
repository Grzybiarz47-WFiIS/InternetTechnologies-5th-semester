<?php

function __autoload($class_name) {
	$path_to_class = __DIR__. '/' . str_replace('\\', DIRECTORY_SEPARATOR, $class_name) . '.php';
	if (file_exists($path_to_class)) { 
		require_once($path_to_class);
	}
	else {
		header('HTTP/1.1 404 Not Found');
		print '<!doctype html><html><head><title>404 Not Found</title></head><body><p>Invalid URL</p></body></html>';
	}  
}

use info\Info;
use base\Base;
use log\Log;

try {
	session_start();
	if (empty ($_GET['sub'])) { 
		$contr = 'Info';
	}
	else { 
		$contr = $_GET['sub'];
	}
 
	if (empty($_GET['action'])) { 
		$action = 'index';  
	}
	else { 
		$action = $_GET['action'];
	} 
	
	switch ($contr) {           
		case 'Info':
			$contr = "info\\".$contr;                      
			break;
		case 'Base':
			$contr = "base\\" . $contr;
			break;  
		case 'Log':
			$contr = "log\\" . $contr;
			break;  
	}
	$controller = new $contr;
	echo $controller->$action();
}
catch (Exception $e) {
	echo 'Error: [' . $e->getCode() . '] ' . $e->getMessage();
}
 
?>