<?php
		include_once 'includes/commonFunc.php';

		if (loggedin()) {
			include "includes/class-query.php";
			$name = $query->getInfo($_SESSION["enigma_user"])['Name'];
			$online = $query->getOnline($_SESSION["enigma_user"]);
			
			echo '  <!-- NAVIGATION -->
					<div id="navigation">
						<div id="nav-left">
							<a href="home.php" class="nav-item"> ИГРАЈ </a>
						</div>
						<div id="nav-right">
							<a href="profile.php" class="nav-item">';
			
			$comp = preg_split("/ +/",  $name);
			echo $comp[0];
			
			echo '</a> <div class="separator"></div> 
							<a onclick="loggingOut();" class="nav-item"> Одјави се! </a>
						</div>
					</div>
			
					<!-- LOGO SECTION -->
					<div id="logo-section-main">
						<div id="logo-section">
							<div id="logo"> <a href="home.php" id="logo-link"> <h1 class="small-logo-text">Енигма</h1> </a> </div>
							<div id="welcome">
								<label class="greating-item"> Добредојдовте, ';
			
			echo $name;
			
			echo '! </label>
							</div>
						</div>
						<div id="feed">
							<div id="statistics" class="box">
								<div id="statistics-inside">
									<img src="img/que_mark.png" class="help" id="help_stats">
									0 Прашања<br>';
			echo $online;
			
			echo ' Вклучен играч
								</div>
								<div id="dec"></div>
							</div>
							<div id="trending" class="box">
								<img src="img/que_mark.png" class="help" id="help_trending"/>
								<label id="news"> ! CONSTRUCTION IN PROGRESS ! </label>
							</div>
						</div>
					</div>';
		
		}

?>