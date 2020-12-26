<?php
 
namespace log;
 
use app\{View, Controller};
 
class Log extends Controller 
{
	protected $layout;
    protected $model;
 
    function __construct() {
		parent::__construct();
		$this->layout = new View('main');
		$this->layout->css = $this->css;
		$this->layout->menu = $this->menu;
		$this->model = new Model();
    }
 
    function login() {     
		$this->layout->header = 'Logowanie';
		$this->view = new View('login');
		$this->view->data = $this->model->getLogin();
		$this->layout->content = $this->view; 
		return $this->layout;
    }
     
    function register() {
		$this->layout->header = 'Rejestracja';
		$this->view = new View('login');
		$this->view->data = $this->model->getRegister();
		$this->layout->content = $this->view;
		return $this->layout;
	}
 
    function saveRec() {
		$data = $_POST['data'];
		$obj  = json_decode($data);
		if (isset($obj->login) and isset($obj->pass)) {    
			$response = $this->model->saveRec($obj);
		}
		return ($response ? "Zarejestrowano uzytkownika" : "Blad rejestracji");
    }

	function checkData() {
		$data = $_POST['data'];
		$obj  = json_decode($data);
		if (isset($obj->login) and isset($obj->pass)) {    
			$response = $this->model->checkData($obj);
		}
		if($response) {
			$_SESSION['auth'] = 'OK';
			$_SESSION['user'] = $obj->login;
		}
		return ($response ? "Zalogowano uzytkownika" : "Blad logowania");
    }

	function logout() {
		unset($_SESSION); 
		session_destroy(); 
		$this->layout->header = 'Wylogowano';
		$this->menu = file_get_contents('template/menu_logout.tpl');
		$this->layout->menu = $this->menu;
		return $this->layout;
	}
} 
 
?>