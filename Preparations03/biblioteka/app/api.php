<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("rest.php");
require_once("base.php");
    
class API extends REST{

    private $base;
     
    public function __construct(){
        parent::__construct();       
        $this->base = new Base();
    }

    public function process(){
        $func = $this->endpoint; 
        if((int)method_exists($this, $func) > 0){
            $this->$func();
        }  
        else{
            $this->response('Page not found'); 
        }         
    }

    private function category(){
        if($this->method == "GET"){
            $this->response($this->make_string($this->base->select_cat()));
        }
    }

    private function select_by_id(){
        $this->select(0);
    }

    private function select_by_cat(){
        $this->select(1);
    }

    private function select($flag){
        if($this->method == "GET"){
            $data = $this->args[0];
            $ans = array();
            if($flag == 0){
                $ans = $this->base->select_by_id($data);
            }
            if($flag == 1){
                $ans = $this->base->select_by_cat($data);
            }
            $this->response($this->make_string($ans));
        }
    }

    private function insert_cat(){
        $this->insert(0);
    }

    private function insert_book(){
        $this->insert(1);
    }

    private function insert($flag){
        if($this->method == "POST"){
            $data = json_decode($this->request, true);
            $ans = 'Dodano rekord';
            if($flag == 0){
                $this->base->insert_cat($data);
            }
            if($flag == 1){
                $this->base->insert_book($data);
            }
            $this->response($ans);
        }
    }

    private function delete_cat(){
        $this->delete(0);
    }

    private function delete_book(){
        $this->delete(1);
    }

    private function delete($flag){
        if($this->method == "DELETE"){
            $data = $this->args[0];
            $ans = 'Usunięto rekord';
            if($flag == 0){
                $this->base->delete_cat($data);
            }
            if($flag == 1){
                $this->base->delete_book($data);
            }
            $this->response($ans);
        }
    }

    private function make_string($ans){
        $result = "";
        foreach($ans as $row){
            $result = $result . implode("/", $row);     
            $result = $result . "||";      
        }
        return $result;
    }
}

$api = new API();
$api->process();
 
?>