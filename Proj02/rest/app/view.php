<?php
 
class View{
    protected $file;
    protected $data = array();
     
    public function __construct($template){
        $file = __DIR__ .'/../template/'. $template .'.tpl';
        if (file_exists($file)){
            $this->file =  $file;
        }
        else{ 
            throw new Exception("Template ". $file ." doesn't exist.");
        }
    }
     
    public function __set($key, $value){
        $this->data[$key] = $value;
    }
     
    public function __get($key){
        return $this->data[$key];
    }
     
    public function __toString(){    
        extract($this->data);
        ob_start();
        include($this->file);
        $output = ob_get_contents();
        ob_end_clean();
        return $output;
    }
}

?>  