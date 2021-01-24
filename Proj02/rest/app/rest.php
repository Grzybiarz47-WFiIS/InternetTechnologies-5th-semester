<?php
 
class REST{

    public $content_type = "text/plain";
    public $request = Array();

    protected $args = Array();
    protected $endpoint = "";
    protected $method = "";

    private $code = 200;

    public function __construct(){
        $this->input();
    }

    private function input(){
        $this->args = explode('/', rtrim($_REQUEST['request'], '/'));
        $this->endpoint = array_shift($this->args);
        $this->method = $_SERVER['REQUEST_METHOD'];

        switch($this->method){
            case "POST":
                $this->request = file_get_contents("php://input");
                $this->request = $this->cleanInput($this->request);
                break;
            case "GET":
                $this->request = $this->cleanInput($_GET);
                break;
            default:
                $this->response('Method not allowed', 405);
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
    
    public function response($data, $status = 200){
        $this->code = $status;
        $this->set_headers();
        echo $data;
        exit;
    }

    private function set_headers(){
        header("HTTP/1.1 " .$this->code. " " .$this->get_status_message());
        header("Content-Type:". $this->content_type);
    }

    private function get_status_message(){
        $status = array(
        200 => 'OK', 
        400 => 'Bad Request',  
        401 => 'Unauthorized',  
        402 => 'Payment Required',  
        403 => 'Forbidden',  
        404 => 'Not Found',  
        405 => 'Method Not Allowed',  
        406 => 'Not Acceptable',  
        500 => 'Internal Server Error',  
        501 => 'Not Implemented',  
        502 => 'Bad Gateway',  
        503 => 'Service Unavailable',  
        504 => 'Gateway Timeout',  
        505 => 'HTTP Version Not Supported');
        return ($status[$this->code]) ? $status[$this->code] : $status[500];
    }
}
?>