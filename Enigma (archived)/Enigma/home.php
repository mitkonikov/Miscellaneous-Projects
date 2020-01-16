<?php

error_reporting(-1); // reports all errors
ini_set("display_errors", "1"); // shows all errors

require 'includes/commonFunc.php';

if (loggedin() == FALSE) {
    header("Location: index.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>

	<!-- GLOBAL -->
    <?php include("includes/globalReq.php"); ?>
	<!-- end GLOBAL -->
	
	<script src="js/home.js"> </script>
	<link rel="stylesheet" href="css/featured.css"/>
</head>
<body>
    <div id="main-container">
	
		<!-- HEADER -->
		<?php include("header.php"); ?>
		
		<div class="row" style="clear: both;">
			<div class="box" id="feat-games">
				<div class="box feat-game" onclick="window.location = 'quiz.php';">
					<div class="feat-game-inside" id="feat-game-1">
						
						<div id="feat-que"> </div>
						
						<div id="feat-answers">
							<div class="feat-ans"> </div>
							<div class="feat-ans"> </div>
							<div class="feat-ans"> </div>
							<div class="feat-ans"> </div>
						</div>
						
					</div>
					<label> КВИЗ </label>
				</div>
				<div class="box feat-game">
					<div class="feat-game-inside" id="feat-game-2">
						
						<div id="feat-ar-final"> </div>
						<div id="feat-ar-op"> 
							<div class="feat-ar-op-item"> </div>
							<div class="feat-ar-op-item"> </div>
							<div class="feat-ar-op-item"> </div>
						</div>
						<div id="feat-ar-state"> </div>
						
					</div>
					<label> АРИТМЕТИКА </label>
				</div>
				<div class="box feat-game">
					<div class="feat-game-inside" id="feat-game-3">
						
						<div id="feat-word-def"> </div>
						<div id="feat-word"> </div>
						
					</div>
					<label> ЗБОРНИК </label>
				</div>
				<div class="box feat-game">
					<div class="feat-game-inside" id="feat-game-4">
						
					</div>
					<label> ... </label>
				</div>
			</div>
		</div>
		
		<div class="row" id="footer">
			<div class="box-medium" id="leaderboard">
			
			</div>
			<div class="box-medium" id="idea">
				
			</div>
		</div>
    </div>
</body>
</html>