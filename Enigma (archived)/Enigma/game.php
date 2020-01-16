<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="mobile-web-app-capable" content="yes">
	<head>
		<script src="js/jquery-3.1.1.js"> </script>
		<script src="js/launcher.js"> </script>
		<style> 
			body { padding: 0; margin: 0; }
			#GAME { margin: auto; width: 365px; }
			#startButton { margin: auto; width: 110px; }
		</style>
	</head>
	<body>
		<div id="GAME">
			<iframe id="Canvas" src="gameEnd.php" width="360px" height="640px" scrolling="no" style="padding: 0; margin: 0; overflow:hidden;" allowfullscreen="true"> </iframe>
			<br/>
			<div id="startButton">
				<button id="goFS"> Start the Game </button>
			</div>
		</div>
	</body>
</html>