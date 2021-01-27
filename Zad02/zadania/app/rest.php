<?php
 
class REST{

    public $content_type = "text/html";
    public $request = Array();

    protected $args = Array();
    protected $endpoint = "";
    protected $method = "";

    public function __construct(){
        $this->input();
    }

    private function input(){
        $this->args = explode('/', rtrim($_REQUEST['request'], '/'));
        $this->endpoint = array_shift($this->args);
        $this->method = $_SERVER['REQUEST_METHOD'];

        switch($this->method){
            case "POST":
                $this->request = $this->cleanInput(file_get_contents("php://input"));
                break;
            case "PUT":
                $this->request = $this->cleanInput(file_get_contents("php://input"));
                break;
            case "GET":
                $this->request = $this->cleanInput($_GET);
                break;
 	     	case "DELETE":
        		$this->_request = $this->cleanInput($_GET);
                break;
        }
    }     
   
    private function cleanInput($data){
        $clean_input = array();
        if(is_array($data)){
            foreach($data as $k => $v){
                $clean_input[$k] = $this->cleanInput($v);
            }
        }
        else{
            if(get_magic_quotes_gpc()){
                $data = trim(stripslashes($data));
            }
            $data = strip_tags($data);
            $clean_input = trim($data);
        }
        return $clean_input;
    }        
    
    public function response($data){
        $this->set_headers();
        echo $data;
        exit;
    }

    private function set_headers(){
        header("HTTP/1.1 200 OK");
        header("Content-Type:". $this->content_type);
    }

}
?>