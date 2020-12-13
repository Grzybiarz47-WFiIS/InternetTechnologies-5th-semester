<?php
 
class Register {
 
	private $data = array();
	private $dbh;
	private $dbfile = "files/datadb.db";
 
	function __construct () { 
		session_start();
	}
       
	function _read () {
		$this->data['fname'] = $_POST['fname'] ;
		$this->data['lname'] = $_POST['lname'] ;
		$this->data['email'] = $_POST['email'] ;
		$this->data['pass']  = $_POST['pass'] ;
	}          
 
    function _write_reg ($ans) {
        echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
        echo "<h3>Wprowadzone dane</h3><br/>";
        echo "Imiê: ". $this->data['fname'] ." <br/>";
        echo "Nazwisko: ". $this->data['lname'] ." <br/>";
        echo "E-mail: ". $this->data['email'] ." <br/>";
        echo "Has³o: *** <br/>";
		echo $ans;
		echo "<a href=\"lab09.html\">Powrót</a>";
		echo "</body></html>";
    }

	function _write_login ($ans) {
        echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
        echo "<h3>Wprowadzone dane</h3><br/>";
        echo "E-mail: ". $this->data['email'] ." <br/>";
        echo "Has³o: *** <br/>";
		echo $ans;
		echo "</body></html>";
    }

	function _write_logout () {
	    echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
		echo "<h3>U¿ytkownik wylogowany</h3>";
		echo "<a href=\"lab09.html\">Powrót</a>";
		echo "</body></html>";
    }

	function _write_userdata () {
	    echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
		echo "<h3>Dane u¿ytkownika:</h3>";
        echo "Imiê: ". $this->data['fname'] ." <br/>";
        echo "Nazwisko: ". $this->data['lname'] ." <br/>";
        echo "E-mail: ". $this->data['email'] ." <br/>";
		echo "<a href=\"lab09_menu.html\">Powrót</a>";
		echo "</body></html>";
    }

	function _write_all() {
		echo "<!DOCTYPE html><html><head>";
        echo "<meta charset=\"UTF-8\">";
		echo "<title>Jêzyk PHP</title>";
        echo "<link rel=\"StyleSheet\" href=\"lab09.css\" type=\"text/css\" />";
		echo "</head><body>";
		echo "<table><thead><tr><th>E-mail</th><th>Imiê</th><th>Nazwisko</th></tr></thead><tbody>";
		$this->dbh = dba_open( $this->dbfile, "r");   
		$key = dba_firstkey($this->dbh);
		while($key) {
			$serialized_data = dba_fetch($key, $this->dbh);
			$this->data = unserialize($serialized_data);
			$key = dba_nextkey($this->dbh);
			echo "<tr>";
			echo "<th>". $this->data['email'] ."</th>";
			echo "<th>". $this->data['fname'] ."</th>";
			echo "<th>". $this->data['lname'] ."</th>";
			echo "</tr>";
		}    
		dba_close($this->dbh);
		echo "</tbody></table><a href=\"lab09_menu.html\">Powrót</a>";
		echo "</body></html>";
	}

	function _save () {
		$this->dbh = dba_open( $this->dbfile, "c");
		if (!dba_exists($this->data['email'], $this->dbh)) {
			$serialized_data = serialize($this->data);
			dba_insert($this->data['email'], $serialized_data, $this->dbh);
			$text = 'Dane zosta³y zapisane';
		}
		else {          
			$text = 'Dane dla podanego adresu e-mail sa ju¿ w bazie danych';
		}
		dba_close($this->dbh) ;
		return $text;
	} 

	function _validate () {
		if($this->data['pass'] == '' or $this->data['lname'] == '' or $this->data['fname'] == '' or $this->data['email'] == '') {
			return false;
		}
		if(strpos($this->data['email'], '@') === false) {
			return false;
		}
		return true;
	}

	function _login() {
		$email = $_POST['email'];
		$pass  = $_POST['pass'];
		$access = false;
		$this->dbh = dba_open( $this->dbfile, "r");   
		if(dba_exists( $email, $this->dbh )) {
			$serialized_data = dba_fetch($email, $this->dbh);
			$this->data = unserialize($serialized_data);
			if($this->data['pass'] == $pass) {
				$_SESSION['auth'] = 'OK';
				$_SESSION['user'] = $email;
				$access = true ;
			}
		}
		$this->data['email'] = $email;
		dba_close($this->dbh);   
	}
 
	function _is_logged() {
		if(isset($_SESSION['auth'])) { 
			$res = $_SESSION['auth'] == 'OK' ? true : false;
		} 
		else { 
			$res = false;
		}
		return $res;
	}

	function _logout() {
		unset($_SESSION); 
		session_destroy();   
	}

	function _read_user() {
		$email = $_SESSION['user'] ;
		$this->dbh = dba_open( $this->dbfile, "r");   
		if(dba_exists($email, $this->dbh)) {
			$serialized_data = dba_fetch($email, $this->dbh);
			$this->data = unserialize($serialized_data);
		}	   
		dba_close($this->dbh);   
	}

}

?>