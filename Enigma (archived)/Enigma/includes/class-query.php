<?php

	$table_users = 'enigma_users';
	$table_news = 'enigma_news';
	$table_info = 'enigma_info';

	if ( !class_exists('QUERY') ) {
		class QUERY {
			public function __construct() {
				$mysqli = new mysqli('localhost', 'id181331_b7_17144442', 'visuals2001', 'id181331_enigma_users');
				
				if ($mysqli->connect_errno) {
					printf("Connect failed %s\n", $mysqli->connect_error);
					exit();
				}
				
				$this->connection = $mysqli;
			}
			
			public function executeCommand($stmt) {
				$stmt->execute();
				$stmt->store_result();
				$stmt->fetch();
			}
			
			public function loginCheck($email) {
				$result = null;
				$stmt = $this->connection->prepare("SELECT ID, Password, Name, isVerified 
													FROM enigma_users
													WHERE Email = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $email);
					$stmt->bind_result($id, $pass, $name, $isVer);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) {
						$result['ID'] = $id;
						$result['Password'] = $pass;
						$result['Name'] = $name;
						$result['isVerified'] = $isVer;
					} else { $result = 'doesntexist'; }
					
					$stmt->close();
					
				} else { return FALSE; }
				return $result;
			}

			public function emailCheck($email) {
				$stmt = $this->connection->prepare("SELECT ID 
													FROM enigma_users
													WHERE Email = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $email);
					$stmt->bind_result($id);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) { return '1'; }
					
					$stmt->close();
					
				} else { return '0'; }
				return '0';
			}
			
			public function getID($email) {
				$result = null;
				$stmt = $this->connection->prepare("SELECT ID
													FROM enigma_users
													WHERE Email = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $email);
					$stmt->bind_result($id);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) { $result = $id; } 
					else { $result = 'doesntexist'; }
					
					$stmt->close();
					
				} else { return FALSE; }
				return $result;
			}

			public function getInfo($user_id) {
				$result = null;
				$stmt = $this->connection->prepare("SELECT Name, Email
													FROM enigma_users
													WHERE ID = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $user_id);
					$stmt->bind_result($name, $email);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) {
						$result['Name'] = $name;
						$result['Email'] = $email;
					} else { $result = 'doesntexist'; }
					
					$stmt->close();
					
				} else { return FALSE; }
				return $result;
			}
			
			public function getOnline() {
				$result = null;
				$stmt = $this->connection->prepare("SELECT ID
													FROM enigma_info
													WHERE Online = '1'"
												);
				if ($stmt != null) {
					$stmt->bind_result($id);
					
					$this->executeCommand($stmt);
					
					$result = $stmt->num_rows;
					
					$stmt->close();
					
				} else { return FALSE; }
				return $result;
			}
			
			public function getForgetCode($id) {
				$result = null;
				$stmt = $this->connection->prepare("SELECT Forget
													FROM enigma_info
													WHERE ID = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $id);
					$stmt->bind_result($forget);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) { $result = $forget; } 
					else { $result = 'doesntexist'; }
					
					$stmt->close();
					
				} else { return FALSE; }
				return $result;
			}
			
			public function verCodeCheck($verCode) {
				$stmt = $this->connection->prepare("SELECT ID, Email 
													FROM enigma_users
													WHERE VerificationCode = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $verCode);
					$stmt->bind_result($id, $email);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) { return '1'; }
					
					$stmt->close();
					
				} else { return 'doesntexist'; }
				return 'doesntexist';
			}
			
			public function isVerified($email) {
				$stmt = $this->connection->prepare("SELECT isVerified
													FROM enigma_users
													WHERE Email = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $email);
					$stmt->bind_result($isVerified);
					
					$this->executeCommand($stmt);
					
					if ($stmt->num_rows > 0) { return $isVerified; }
					else { return '0'; }
					
					$stmt->close();
					
				} else { return 'doesntexist'; }
				return 'doesntexist';
			}
			
			public function escapeString($stringIn) {				
				$result = $this->connection->real_escape_string($stringIn);;
				
				return $result;
			}
			
			public function newsReadout() {
				$result = null;
				$stmt = $this->connection->prepare("SELECT * 
													FROM enigma_news"
												);
				if ($stmt != null) {
					$stmt->bind_result($id, $var);
					$stmt->execute();
					$stmt->store_result();
					while ($stmt->fetch()) {
						$result[] = $var;
					}
					if ($stmt->num_rows > 0) { return $result; }
					$stmt->close();
				} else { return false; }
				return false;
			}
			
			public function checkSalt($email) {
				$result = null;
				$stmt = $this->connection->prepare("SELECT ID, Salt 
													FROM enigma_users
													WHERE Email = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $email);
					$stmt->bind_result($id, $salt);
					$stmt->execute();
					$stmt->store_result();
					$stmt->fetch();
					$result['ID'] = $id;
					$result['Salt'] = $salt;
					$stmt->close();
					if ($result === null) { return FALSE; }
				} else { return FALSE; }
				return $result;
			}
			
			public function checkForget($forgetCode) {
				$stmt = $this->connection->prepare("SELECT ID 
													FROM enigma_info
													WHERE Forget = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("s", $forgetCode);
					$stmt->bind_result($ID);
					$stmt->execute();
					$stmt->store_result();
					$stmt->fetch();
					if ($stmt->num_rows > 0) { 
						return $ID;
					} else {
						return FALSE;
					}
					$stmt->close();
				} else { return FALSE; }
				return FALSE;
			}
		}
	}
	
	$query = new QUERY;
?>