<?php

require_once("../base/database.php");

class RWJSON{

    private $db;

    public function __construct(){
        $this->db = new Database();
    }

    public function saveJSON($json_data){
        $this->saveToTable('dwutlenek_siarki', $json_data[0]);
        $this->saveToTable('dwutlenek_azotu', $json_data[1]);
        $this->saveToTable('pm10', $json_data[2]);        
        return 'true';
    }

    public function readJSON($option){
        $table = $this->db->select($this->getTablename($option));
        $res = "";
        foreach($table as $row){
            $res = $res . $row['0'] . '::' . $row['1'] . '::' . $row['2'] . '||';
        }
        return $res;
    }

    private function saveToTable($tablename, $table){
        foreach($table as $row){
            if($this->db->find($tablename, $row) == 'true'){
                $this->db->update($tablename, $row);
            }
            else{
                $this->db->insert($tablename, $row);
            }
        }
    }

    private function getTablename($option){
        $tablelist = array(
        1 => 'dwutlenek_siarki', 
        2 => 'dwutlenek_azotu',  
        3 => 'pm10');
        return $tablelist[$option];
    }
}

?>