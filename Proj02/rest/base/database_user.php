<?php

use PDO;

class DatabaseUser{
    static $dsn = 'sqlite:'. __DIR__ .'/../sql/base_user.db';
    private static $db;
    private $sth;

    function __construct(){
        $data = explode(':', self::$dsn) ;
        if (!file_exists($data[1])){
            throw new Exception("Database file doesn't exist");  
        }
        self::$db = new PDO (self::$dsn) ;
        self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    }

    public function find($data){
        $this->sth = self::$db->prepare('SELECT EXISTS(SELECT * FROM osoba WHERE login = :login AND pass = :pass) as val');
        $this->sth->bindValue(':login', $data['login'], PDO::PARAM_STR);
        $this->sth->bindValue(':pass', md5($data['pass']), PDO::PARAM_STR); 
        $this->sth->execute();
        $result = $this->sth->fetchAll();
        return ($result[0][0] == 1 ? 'true' : 'false');
    }

    public function find_user($data){
        $this->sth = self::$db->prepare('SELECT EXISTS(SELECT * FROM osoba WHERE login = :login) as val');
        $this->sth->bindValue(':login', $data['login'], PDO::PARAM_STR);
        $this->sth->execute();
        $result = $this->sth->fetchAll();
        return ($result[0][0] == 1 ? 'true' : 'false');
    }

    public function insert($data){
        $this->sth = self::$db->prepare('INSERT INTO osoba VALUES (:login, :pass)');
        $this->sth->bindValue(':login', $data['login'], PDO::PARAM_STR); 
        $this->sth->bindValue(':pass', md5($data['pass']), PDO::PARAM_STR); 
        $response = ($this->sth->execute() ? 'true' : 'false' );
        return $response; 
     }
}

?>