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
        $this->sth = self::$db->prepare("SELECT * FROM kategorie");
        $this->sth->execute();
        $result = $this->sth->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function select_by_cat($data){
        $this->sth = self::$db->prepare("SELECT * FROM ksiazka WHERE kategoria = :kategoria");
        $this->sth->bindValue(':kategoria', $data, PDO::PARAM_STR); 
        $this->sth->execute();
        $result = $this->sth->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function select_by_id($data){
        $this->sth = self::$db->prepare("SELECT * FROM ksiazka WHERE id = :id");
        $this->sth->bindValue(':id', intval($data), PDO::PARAM_STR); 
        $this->sth->execute();
        $result = $this->sth->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function insert_cat($data){
       $this->sth = self::$db->prepare("INSERT INTO kategorie VALUES (:kategoria)");
       $this->sth->bindValue(':kategoria', $data['kategoria'], PDO::PARAM_STR); 
       $this->sth->execute();
    }

    public function insert_book($data){
        $this->sth = self::$db->prepare("INSERT INTO ksiazka VALUES (:id, :kategoria, :autor, :tytul, :wydawca)");
        $this->sth->bindValue(':kategoria', $data['kategoria'], PDO::PARAM_STR); 
        $this->sth->bindValue(':id', intval($data['id']), PDO::PARAM_STR); 
        $this->sth->bindValue(':autor', $data['autor'], PDO::PARAM_STR); 
        $this->sth->bindValue(':tytul', $data['tytul'], PDO::PARAM_STR); 
        $this->sth->bindValue(':wydawca', $data['wydawca'], PDO::PARAM_STR); 
        $this->sth->execute();
     }

    public function delete_cat($data){
        $this->sth = self::$db->prepare("DELETE FROM kategorie WHERE kategoria = :kategoria");
        $this->sth->bindValue(':kategoria', $data, PDO::PARAM_STR); 
        $this->sth->execute();
    }

    public function delete_book($data){
        $this->sth = self::$db->prepare("DELETE FROM ksiazka WHERE id = :id");
        $this->sth->bindValue(':id', intval($data), PDO::PARAM_STR); 
        $this->sth->execute();
    }

}

?>  