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

    public function readJSON($option, $localization){
        $table = $this->db->select($this->getTablename($option), $this->getLocalization($localization));
        $res = array();
        foreach($table as $row){
            $res[] = array('x' => substr($row['0'], -5), 'y' => $row['2']);
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

    private function getLocalization($option){
        $tablelist = array(
        1 => 'Skawina', 
        2 => 'Nowa Huta',  
        3 => 'Kraków-Kurdwanów');
        return $tablelist[$option];
    }
}

?>