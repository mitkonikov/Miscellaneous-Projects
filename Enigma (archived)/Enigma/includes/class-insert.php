<?php
	require_once('class-db.php');
	
	$table_users = 'enigma_users';
	$table_news = 'enigma_news';
	$table_info = 'enigma_info';
	
	if ( !class_exists('INSERT') ) {
		class INSERT {
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
			
		    public function register_user($userpass, $userfullname, $useremail, $uservercode, $salt)
            {
            	global $db, $table_users;
            	$query = "
            					INSERT INTO $table_users (ID, Password, Name, Email, Salt, isVerified, VerificationCode)
            					VALUES ('', '$userpass', '$userfullname', '$useremail', '$salt','0' ,'$uservercode')
            				";

            	return $db->insert($query);
            }
			
			public function register_user_info($id, $userschool, $userbirth, $forget)
            {
            	global $db, $table_info;
            	$query = "
            					INSERT INTO $table_info (ID, School, Birth, Permission, Forget)
								VALUES ('$id', '$userschool', '$userbirth', '0', '$forget')
            				";

            	return $db->insert($query);
            }
			
			public function verify_user($uservercode)
			{
				global $db, $table_users;		
				$query = "
								UPDATE $table_users
								SET isVerified='1', VerificationCode=''
								WHERE VerificationCode='$uservercode'
							";

				return $db->update($query);
			}

			public function update_user($id, $pass, $fullname, $email)
			{
				global $db, $table_users;				
				$query = "
								UPDATE $table_users
								SET Password='$pass', Name='$fullname', Email='$email'
								WHERE ID='$id'
							";

				return $db->update($query);
			}
			
			public function update_pass($id, $pass) {
				global $db, $table_users;				
				$query = "
								UPDATE $table_users
								SET Password='$pass'
								WHERE ID='$id'
							";

				return $db->update($query);
			}
			
			public function update_user_info($id, $school, $birth)
			{
				global $db, $table_info;			
				$query = "
								UPDATE $table_info
								SET School='$school', Birth='$birth'
								WHERE ID='$id'
							";

				return $db->update($query);
			}
			
			public function update_salt($id, $salt) {
				global $db, $table_users;			
				$query = "
								UPDATE $table_users
								SET Salt='$salt'
								WHERE ID='$id'
							";

				return $db->update($query);
			}
			
			// "I forgot my password" section
			public function forget_code($id, $forget) {
				global $db, $table_info;			
				$query = "
								UPDATE $table_info
								SET Forget='$forget'
								WHERE ID='$id'
							";

				return $db->update($query);
			}
			
			public function setOnline($id, $setting) {
				$stmt = $this->connection->prepare("UPDATE enigma_info
													SET Online = ?
													WHERE ID = ?"
												);
				if ($stmt != null) {
					$stmt->bind_param("is", $setting, $id);
					$stmt->execute();
					$stmt->close();
					return TRUE;
				} else { return FALSE; }
				return FALSE;
			}
		}
	}
	
	$insert = new INSERT;
?>