<?php
 
namespace app;
 
abstract class Controller {
  
	protected $css;
    protected $menu;
 
	function __construct() {
		$this->css  = "<link rel=\"stylesheet\" href=\"css/style.css\" type=\"text/css\" media=\"screen\" >";
		if(isset($_SESSION['auth']) and $_SESSION['auth'] == 'OK')
			$this->menu = file_get_contents('template/menu_login.tpl');
		else
			$this->menu = file_get_contents('template/menu_logout.tpl');
	}
 
 	function __call($name, $arguments) {
		self::http404();
	}

	static function http404() {
		header('HTTP/1.1 404 Not Found');
		print '<!doctype html><html><head><title>404 Not Found</title></head><body><p>Invalid URL</p></body></html>';
		exit;
	}
}
 
?>