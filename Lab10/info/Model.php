<?php
 
namespace info;
 
class Model
{
	private $table = array();
 
	function __construct() {
		$this->table['main'] = '/. , /index.php, /index.php?sub=Info, /index.php?sub=Info&action=main';
		$this->table['info'] = '/index.php?sub=Info&action=help';
		$this->table['list'] = '/index.php?sub=Base, /index.php?sub=Base&action=listAll';
		$this->table['form'] = '/index.php?sub=Base&action=insertRec';
	}
 
	function getTable() {
		return $this->table;
	}
}
 
?>