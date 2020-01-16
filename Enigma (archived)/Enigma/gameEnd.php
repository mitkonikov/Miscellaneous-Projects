<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="mobile-web-app-capable" content="yes">
	<head>
		<script src="js/p5.min.js">  </script>
		<script src="js/p5.play.js"> </script>
		<script src="js/jquery-3.1.1.js"> </script>
		<script src="js/sketch.js"> </script>
		<script>
		</script>
		<style> body {padding: 0; margin: 0;} 
				.inputFileClass {
					display: block;
					visibility: hidden;
					width: 0;
					height: 0;
				}
		</style>
	</head>
	<body>
		<input type="file" id="inputFile" class="inputFileClass" size="chars" accept=".json">
	</body>
</html>