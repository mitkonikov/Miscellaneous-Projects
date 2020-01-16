<?php
	if ( !class_exists ('DB') ) {
		class DB {
			public function __construct() {
				$mysqli = new mysqli('localhost', 'user', 'pass', 'db');
				
				if ($mysqli->connect_errno) {
					printf("Connect failed %s\n", $mysqli->connect_error);
					exit();
				}
				
				$this->connection = $mysqli;
			}
			
			public function insert($query) {				
				$result = $this->connection->query($query);
				
				return $result;
			}
			
			public function update($query) {
				$result = $this->connection->query($query);
				
				return $result;
			}
			
			public function select($query) {
				$result = $this->connection->query($query);
				
				if ( !$result ) {
					return false;
				}
				
				$results = null;
				
				while ( $obj = $result->fetch_object() ) {
					$results[] = $obj;
				}
				
				return $results;
			}
		}
	}
	
	$db = new DB;
?>