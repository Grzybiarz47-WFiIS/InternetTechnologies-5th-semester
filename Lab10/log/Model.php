<?php
 
namespace log;
use PDO;
 
class Model 
{  
	static $dsn = 'sqlite:sql/users.db';
	protected static $db;
	private $sth;
	private $tableLogin = array();
	private $tableRegister = array();
 
	function __construct() {
		$data = explode(':',self::$dsn);
		if (!file_exists($data[1])) { 
			throw new Exception ("Database file doesn't exist."); 
		}
		self::$db = new PDO(self::$dsn);
		self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
		$this->tableLogin['type'] = 'checkData';
		$this->tableRegister['type'] = 'saveRec';
		$this->tableLogin['button'] = 'Zaloguj';
		$this->tableRegister['button'] = 'Zarejestruj';
	}
 
	public function checkData($obj) {
		$this->sth = self::$db->prepare('SELECT * FROM osoba WHERE login = :user AND pass = :pass');
		$this->sth->execute(['user' => $obj->login, 'pass' => md5($obj->pass)]);
		$data = $this->sth->fetchAll();
		if ($data) { 
			return true;
		}		
		else{
			return false;
		}
    }
 
	public function saveRec($obj) {
		$this->sth = self::$db->prepare('INSERT INTO osoba VALUES ( :login, :pass)');
		$this->sth->bindValue(':login', $obj->login,PDO::PARAM_STR); 
		$this->sth->bindValue(':pass', md5($obj->pass),PDO::PARAM_STR); 
		$resp = ($this->sth->execute() ? 'true' : 'false');
		return $resp; 
	}

	public function getLogin() {
		return $this->tableLogin;
	}

	public function getRegister() {
		return $this->tableRegister;
	}
}
 
?>