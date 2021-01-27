<?php

class Base{  

    static $dsn = 'sqlite:'. __DIR__ .'/../sql/base.db';
    private static $db;
    private $sth;

    public function __construct(){
        $data = explode(':', self::$dsn);
        self::$db = new PDO (self::$dsn);
        self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    }

    public function select_cat(){
        $this->sth = self::$db->prepare("SELECT DISTINCT(kategoria) FROM zadania");
        $this->sth->execute();
        $result = $this->sth->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function select_by_cat($data){
        $this->sth = self::$db->prepare("SELECT * FROM zadania WHERE kategoria = :kategoria");
        $this->sth->bindValue(':kategoria', $data, PDO::PARAM_STR); 
        $this->sth->execute();
        $result = $this->sth->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function select_by_id($data){
        $this->sth = self::$db->prepare("SELECT * FROM zadania WHERE id = :id");
        $this->sth->bindValue(':id', intval($data), PDO::PARAM_STR); 
        $this->sth->execute();
        $result = $this->sth->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function insert_cat($data){
       $this->sth = self::$db->prepare("INSERT INTO zadania (kategoria) VALUES (:kategoria)");
       $this->sth->bindValue(':kategoria', $data['kategoria'], PDO::PARAM_STR); 
       $this->sth->execute();
    }

    public function insert_task($data){
        $this->sth = self::$db->prepare("INSERT INTO zadania (kategoria, tytul, tresc, data_start, data_koniec, status_zadania) 
                                         VALUES (:kategoria, :tytul, :tresc, :data_start, :data_koniec, :status_zadania)");
        $this->sth->bindValue(':kategoria', $data['kategoria'], PDO::PARAM_STR); 
        $this->sth->bindValue(':tytul', $data['tytul'], PDO::PARAM_STR); 
        $this->sth->bindValue(':tresc', $data['tresc'], PDO::PARAM_STR); 
        $this->sth->bindValue(':data_start', $data['data_start'], PDO::PARAM_STR); 
        $this->sth->bindValue(':data_koniec', $data['data_koniec'], PDO::PARAM_STR); 
        $this->sth->bindValue(':status_zadania', $data['status'], PDO::PARAM_STR); 
        $this->sth->execute();
     }

    public function delete_task($data){
        $this->sth = self::$db->prepare("DELETE FROM zadania WHERE id = :id");
        $this->sth->bindValue(':id', intval($data), PDO::PARAM_STR); 
        $this->sth->execute();
    }

    public function update_task($data){
        $this->sth = self::$db->prepare("UPDATE zadania SET 
                                        kategoria = :kategoria, 
                                        tytul = :tytul, 
                                        tresc = :tresc, 
                                        data_start = :data_start, 
                                        data_koniec = :data_koniec, 
                                        status_zadania = :status_zadania
                                        WHERE id = :id");
        $this->sth->bindValue(':id', intval($data['id']), PDO::PARAM_STR); 
        $this->sth->bindValue(':kategoria', $data['kategoria'], PDO::PARAM_STR); 
        $this->sth->bindValue(':tytul', $data['tytul'], PDO::PARAM_STR); 
        $this->sth->bindValue(':tresc', $data['tresc'], PDO::PARAM_STR); 
        $this->sth->bindValue(':data_start', $data['data_start'], PDO::PARAM_STR); 
        $this->sth->bindValue(':data_koniec', $data['data_koniec'], PDO::PARAM_STR); 
        $this->sth->bindValue(':status_zadania', $data['status'], PDO::PARAM_STR); 
        $this->sth->execute();
    }

}

?>  