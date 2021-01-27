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

    private function list_cat(){
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

    private function insert_task(){
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
                $this->base->insert_task($data);
            }
            $this->response($ans);
        }
    }

    private function delete_task(){
        if($this->method == "DELETE"){
            $this->base->delete_task($this->args[0]);
            $this->response('Usunięto rekord');
        }
    }

    private function update_task(){
        if($this->method == "PUT"){
            $data = json_decode($this->request, true);
            $ans = 'Zmodyfikowano rekord';
            $this->base->update_task($data);
            $this->response($ans);
        }
    }

    private function make_string($ans){
        $result = "";
        foreach($ans as $row){
            $result = $result . implode("/", $row);     
            if(isset($row['id'])){
                $result = $result . "<button onclick=del_rec(". $row['id'] .")>Usuń</button>";    
                $result = $result . "<button onclick=update_show(". $row['id'] .")>Modyfikuj</button><br>";   
            }
            else{
                $result = $result . "<br>";
            }
        }
        return $result;
    }
}

$api = new API();
$api->process();
 
?>