<?php

use PDO;

class Database{  
    static $dsn = 'sqlite:'. __DIR__ .'/../sql/base.db';
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

    public function select($tablename){
        $this->sth = self::$db->prepare('SELECT * FROM '. $tablename .' ORDER BY date(data_pomiaru)');
        $this->sth->execute();
        $result = $this->sth->fetchAll();
        return $result;
    }

    public function insert($tablename, $data){
       $this->sth = self::$db->prepare('INSERT INTO '. $tablename .' VALUES (:data_pomiaru, :lokalizacja, :wartosc)');
       $this->sth->bindValue(':data_pomiaru', $data['date'], PDO::PARAM_STR); 
       $this->sth->bindValue(':lokalizacja', $data['localization'], PDO::PARAM_STR); 
       $this->sth->bindValue(':wartosc', $data['value'], PDO::PARAM_STR); 
       $response = ($this->sth->execute() ? 'true' : 'false' );
       return $response; 
    }

    public function update($tablename, $data){
        $this->sth = self::$db->prepare('UPDATE '. $tablename .' SET wartosc = :wartosc 
                                         WHERE lokalizacja = :lokalizacja AND data_pomiaru = :data_pomiaru');
        $this->sth->bindValue(':wartosc', $data['value'], PDO::PARAM_STR); 
        $this->sth->bindValue(':lokalizacja', $data['localization'], PDO::PARAM_STR); 
        $this->sth->bindValue(':data_pomiaru', $data['date'], PDO::PARAM_STR); 
        $response = ($this->sth->execute() ? 'true' : 'false');
        return $response; 
     }

    public function find($tablename, $data){
        $this->sth = self::$db->prepare('SELECT EXISTS(SELECT * FROM '. $tablename .' WHERE
                                         lokalizacja = :lokalizacja AND data_pomiaru = :data_pomiaru) as val');
        $this->sth->bindValue(':lokalizacja', $data['localization'], PDO::PARAM_STR);
        $this->sth->bindValue(':data_pomiaru', $data['date'], PDO::PARAM_STR); 
        $this->sth->execute();
        $result = $this->sth->fetchAll();
        return ($result[0][0] == 1 ? 'true' : 'false');
    }
}

?>  