<?php
 
interface NoteInterface
{
	function _read();
	function _save();
	function _write_all($user);
}

class Note implements NoteInterface {
	private $data = array();
	private $dbh;
	private $dbfile = "files/notes.db";
 
	function __construct () { 

	}

	function _read () {
		$this->data['text'] = $_POST['note'];
		$this->data['date'] = $_SERVER['REQUEST_TIME'];
		$this->data['email'] = $_SESSION['user'];
	}

	function _save() {
		$key = $this->data['email'] .'&'. $this->data['date'];
		$this->dbh = dba_open($this->dbfile, "c");
		if (!dba_exists($key, $this->dbh)) {
			$serialized_data = serialize($this->data);
			dba_insert($key, $serialized_data, $this->dbh);
			$res = 'Dane zosta³y zapisane';
		}
		else {          
			$res = 'Dane dla s¹ ju¿ w bazie danych';
		}
		dba_close($this->dbh) ;
		return $res;
	}

	function _write_all($user) {
		echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
		$this->dbh = dba_open( $this->dbfile, "r");   
		$key = dba_firstkey($this->dbh);
		while($key) {
			$serialized_data = dba_fetch($key, $this->dbh);
			$this->data = unserialize($serialized_data);
			$key = dba_nextkey($this->dbh);
			if($user == $this->data['email']) {
				echo "<fieldset>";
				echo "<legend>". $this->data['email'] ." | ". date("l jS \of F Y h:i:s A", $this->data['date']) ."</legend>";
				echo $this->data['text'];
				echo "</fieldset>";
			}
		}    
		dba_close($this->dbh);
		echo "<a href=\"lab09_menu.html\">Powrót</a>";
		echo "</body></html>";
	}

	function _write_info($info) {
		echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
		echo "<h3>";
		echo $info;
		echo "</h3>";
		echo "<a href=\"lab09_menu.html\">Powrót</a>";
		echo "</body></html>";
	}
}

?>