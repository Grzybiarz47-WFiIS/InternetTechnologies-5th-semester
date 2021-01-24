<?php

require_once("../base/database_user.php");

class Log{

    private $login;
    private $pass;
    private $db;

    public function __construct($json_data){
        $this->db = new DatabaseUser();
        $this->login = $json_data["login"];
        $this->pass = $json_data["pass"];
    }

    public function loginUser(){
        if($this->db->find(array("login" => $this->login, "pass" => $this->pass)) == 'true'){
            $_SESSION['auth'] = 'OK';
            $_SESSION['user'] = $this->login;
            return 'true';
        }
        else{
            return 'false';
        }
    }

    public function registerUser(){
        $user = array("login" => $this->login, "pass" => $this->pass);
        if($this->db->find_user($user) == 'false'){
            $ans = $this->db->insert($user);
            if($ans == 'true'){
                $_SESSION['auth'] = 'OK';
                $_SESSION['user'] = $this->login;
                return 'true';
            }
            else{
                return '<h2>Nie udało się dodać użytkownika</h2>';
            }
        }
        else{
            return '<h2>Użytkownik jest już w bazie</h2>';
        }
    }
}

?>