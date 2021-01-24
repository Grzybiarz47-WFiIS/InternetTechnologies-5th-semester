<?php
 
class REST{

    public $content_type = "text/plain";
    public $request = Array();

    protected $args = Array();
    protected $endpoint = "";

    private $code = 200;

    public function __construct(){
        $this->input();
    }

    private function input(){
        $this->args = explode('/', rtrim($_REQUEST['request'], '/'));
        $this->endpoint = array_shift($this->args);

        switch($_SERVER['REQUEST_METHOD']){
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
        // 100 => 'Continue',  
        // 101 => 'Switching Protocols',  
        200 => 'OK',
        // 201 => 'Created',  
        // 202 => 'Accepted',  
        // 203 => 'Non-Authoritative Information',  
        // 204 => 'No Content',  
        // 205 => 'Reset Content',  
        // 206 => 'Partial Content',  
        // 300 => 'Multiple Choices',  
        // 301 => 'Moved Permanently',  
        // 302 => 'Found',  
        // 303 => 'See Other',  
        // 304 => 'Not Modified',  
        // 305 => 'Use Proxy',  
        // 306 => '(Unused)',  
        // 307 => 'Temporary Redirect',  
        // 400 => 'Bad Request',  
        // 401 => 'Unauthorized',  
        // 402 => 'Payment Required',  
        // 403 => 'Forbidden',  
        404 => 'Not Found',  
        405 => 'Method Not Allowed',  
        406 => 'Not Acceptable',  
        // 407 => 'Proxy Authentication Required',  
        // 408 => 'Request Timeout',  
        // 409 => 'Conflict',  
        // 410 => 'Gone',  
        // 411 => 'Length Required',  
        // 412 => 'Precondition Failed',  
        // 413 => 'Request Entity Too Large',  
        // 414 => 'Request-URI Too Long',  
        // 415 => 'Unsupported Media Type',  
        // 416 => 'Requested Range Not Satisfiable',  
        // 417 => 'Expectation Failed',  
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