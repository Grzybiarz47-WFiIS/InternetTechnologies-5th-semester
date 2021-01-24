<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("rest.php");
require_once("view.php");
require_once("../base/database.php");
require_once("../base/database_user.php");
    
class API extends REST {
     
    public $data = "";
    private $db;
    private $db_user;
     
    public function __construct(){
        parent::__construct();     
        $this->db = new Database();
        $this->db_user = new DatabaseUser();         
    }

    public function processApi(){
        $func = "_". $this->endpoint ; 
        if((int)method_exists($this, $func) > 0){
            $this->$func();
        }  
        else{
            $this->response('Page not found', 404); 
        }         
    }

    private function _index(){
        $v = new View('base');
        $v->menu = 'MENU';
        $v->content = 'CONTENT';
        $this->content_type = "text/html";
        $this->response($v);
    }

    private function _save(){
        $this->response("save");
    }
 
    private function _load(){
        $v = new View('base');
        $v->menu = 'MENU';
        $data = $this->db->select('pm10');
        $v->content = $data[0]['data_pomiaru'];
        $this->content_type = "text/html";
        $this->response($v);
    }

    private function _register(){
        $this->response("register");
    }

    private function _login(){
        $this->response("login");
    }

    private function _logout(){
        $this->response("logout");
    }
 
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }
}
    
$api = new API();
$api->processApi();
 
?>