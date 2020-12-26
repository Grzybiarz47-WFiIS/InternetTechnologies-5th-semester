<?php
 
namespace info;
 
use app\{View, Controller};
 
class Info extends Controller {
 
	protected $layout;
	protected $model;
 
	function __construct() {
		parent::__construct();
		$this->layout = new View('main');   
		$this->layout->css = $this->css;
		$this->layout->menu = $this->menu;
	}
 
	function index() {
		$this->layout->header = 'Simple MVC';
		$this->layout->content = '';
		return $this->layout;
	}
 
	function help() {
		$this->model = new Model();
		$this->layout->header = 'Opis serwisu';
		$this->view = new View('table');
		$this->view->data = $this->model->getTable();
		$this->layout->content = $this->view;
		return $this->layout;
	}
 
	function error($text) {
		$this->layout->content = $text;
		return $this->layout;       
	}
}
 
?>