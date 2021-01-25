<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("rest.php");
require_once("view.php");
require_once("../log/log.php");
require_once("../service/rwjson.php");
    
class API extends REST {
     
    private $v;
     
    public function __construct(){
        parent::__construct();       
        $this->v = new View('base');
        $this->v->content = "";
        $this->v->alert = "";
    }

    public function process(){
        $func = "_". $this->endpoint ; 
        if((int)method_exists($this, $func) > 0){
            $this->$func();
        }  
        else{
            $this->response('Page not found', 404); 
        }         
    }

    private function _index(){
        if($this->method != "POST") {
            $this->response("ERROR 405", 405);
        }
        else if($this->isLogged()){
            $this->content_type = "text/html";
            $this->v->menu = file_get_contents('../template/menu.tpl');
            $this->response($this->v);
        }
        else{
            $this->response("ERROR 403", 403);
        }
    }

    private function _save(){
        if($this->method != "POST") {
            $this->response("ERROR 405", 405);
        }
        else if(!$this->isLogged()){
            $this->response("ERROR 403", 403);
        }
        else if(empty($this->request)){
            $this->response("ERROR 400", 400);
        }
        else{
            try{
                $json_data = json_decode($this->request, true);
                $service = new RWJSON();
                $this->response($service->saveJSON($json_data));
            }
            catch(Exception $e){
                $this->response("ERROR 400", 400);
            }
        }
    }
 
    private function _load(){
        if($this->method != "POST") {
            $this->response("ERROR 405", 405);
        }
        else if(!$this->isLogged()){
            $this->response("ERROR 403", 403);
        }
        else if(empty($this->request)){
            $this->response("ERROR 400", 400);
        }
        else{
            try{
                $service = new RWJSON();
                $this->response($service->readJSON(intval($this->request)));
            }
            catch(Exception $e){
                $this->response("ERROR 400", 400);
            }
        }
    }

    private function _register(){
        if($this->method != "POST") {
            $this->response("ERROR 405", 405);
        }
        else if(empty($this->request)){
            $this->response("ERROR 400", 400);
        }
        else if($this->isLogged()){
            $this->response("ERROR 403", 403);
        }
        else{
            try{
                $json_data = json_decode($this->request, true);
                $log = new Log($json_data);
                $this->response($log->registerUser());
            }
            catch(Exception $e){
                $this->response("ERROR 400", 400);
            }
        }
    }

    private function _login(){
        if($this->method != "POST") {
            $this->response("ERROR 405", 405);
        }
        else if(empty($this->request)){
            $this->response("ERROR 400", 400);
        }
        else if($this->isLogged()){
            $this->response("ERROR 403", 403);
        }
        else{
            try{
                $json_data = json_decode($this->request, true);
                $log = new Log($json_data);
                $this->response($log->loginUser());
            } 
            catch(Exception $e){
                $this->response("ERROR 400", 400);
            }
        }
    }

    private function _logout(){
        if($this->method != "POST") {
            $this->response("ERROR 405", 405);
        }
        else if($this->isLogged()){
            unset($_SESSION['auth']);
            unset($_SESSION['user']); 
            session_destroy();
            $this->response("Wylogowano"); 
        }
        else{
            $this->response("ERROR 403", 403);
        }
    }
 
    private function json($data){
        if(is_array($data)){
            return json_encode($data);
        }
    }

    private function isLogged(){
        return (isset($_SESSION['auth']) and isset($_SESSION['user']));
    }
}

session_start();
$api = new API();
$api->process();
 
?>