var WIDTH = 1920;
var HEIGHT = 1080;

var hits = 0;

var gameOver = false;

var grid;
var box;

var ballColor;
var targetColor;

var gameStatus = 0;

var mouseLocation;

var nodeImageIdle, nodeImageClicked, nodeImageHover;
var ballImageIdle, ballImageClicked, ballImageHover;
var targetImageIdle, targetImageClicked, targetImageHover;
var saveImageIdle, saveImageClicked, saveImageHover;
var loadImageIdle, loadImageClicked, loadImageHover;
var playImageIdle, playImageClicked, playImageHover;
var resetImageIdle, resetImageClicked;

var crossMark, crossMarkLight, plusMark, plusMarkLight, gearMark;

var nodeIdle, nodeClicked, nodeHover;

var arrow, arrowLight;

var uploadedFile = false;

function preload() {
	nodeImageIdle = loadImage("../img/icons/icon-node-idle.jpg");
	nodeImageClicked = loadImage("../img/icons/icon-node-clicked.jpg");
	nodeImageHover = loadImage("../img/icons/icon-node-hover.jpg");
	
	ballImageIdle = loadImage("../img/icons/icon-ball-idle.jpg");
	ballImageClicked = loadImage("../img/icons/icon-ball-clicked.jpg");
	ballImageHover = loadImage("../img/icons/icon-ball-hover.jpg");
	
	targetImageIdle = loadImage("../img/icons/icon-target-idle.jpg");
	targetImageClicked = loadImage("../img/icons/icon-target-clicked.jpg");
	targetImageHover = loadImage("../img/icons/icon-target-hover.jpg");
	
	saveImageIdle = loadImage("../img/icons/icon-save-idle.jpg");
	saveImageClicked = loadImage("../img/icons/icon-save-clicked.jpg");
	saveImageHover = loadImage("../img/icons/icon-save-hover.jpg");
	
	loadImageIdle = loadImage("../img/icons/icon-load-idle.jpg");
	loadImageClicked = loadImage("../img/icons/icon-load-clicked.jpg");
	loadImageHover = loadImage("../img/icons/icon-load-hover.jpg");
	
	playImageIdle = loadImage("../img/icons/icon-play-idle.jpg");
	playImageClicked = loadImage("../img/icons/icon-play-clicked.jpg");
	playImageHover = loadImage("../img/icons/icon-play-hover.jpg");
	
	resetImageIdle = loadImage("../img/icons/icon-reset-idle.jpg");
	resetImageHover = loadImage("../img/icons/icon-reset-hover.jpg");
	resetImageClicked = loadImage("../img/icons/icon-reset-clicked.jpg");
	
	crossMark = loadImage("../img/cross_mark.png");
	crossMarkLight = loadImage("../img/cross_mark_light.png");
	plusMark = loadImage("../img/plus_mark.png");
	plusMarkLight = loadImage("../img/plus_mark_light.png");
	gearMark = loadImage("../img/gear_mark.png");
	
	arrow = loadImage("../img/arrow_right.png");
	arrowLight = loadImage("../img/arrow_right_light.png");
	
	nodeIdle = loadImage("../img/node-idle.jpg");
	nodeHover = loadImage("../img/node-hover.jpg");
}

function resizeImgs() {
	nodeImageIdle.resize(44, 44);
	nodeImageClicked.resize(44, 44);
	nodeImageHover.resize(44, 44);
	
	ballImageIdle.resize(44, 44);
	ballImageClicked.resize(44, 44);
	ballImageHover.resize(44, 44);
	
	targetImageIdle.resize(44, 44);
	targetImageClicked.resize(44, 44);
	targetImageHover.resize(44, 44);
	
	saveImageIdle.resize(44, 44);
	saveImageClicked.resize(44, 44);
	saveImageHover.resize(44, 44);
	
	loadImageIdle.resize(44, 44);
	loadImageClicked.resize(44, 44);
	loadImageHover.resize(44, 44);
	
	playImageIdle.resize(44, 44);
	playImageClicked.resize(44, 44);
	playImageHover.resize(44, 44);
	
	resetImageIdle.resize(44, 44);
	resetImageHover.resize(44, 44);
	resetImageClicked.resize(44, 44);
	
	crossMark = loadImage("../img/cross_mark.png");
	crossMarkLight = loadImage("../img/cross_mark_light.png");
	plusMark = loadImage("../img/plus_mark.png");
	plusMarkLight = loadImage("../img/plus_mark_light.png");
	gearMark = loadImage("../img/gear_mark.png");
	
	arrow = loadImage("../img/arrow_right.png");
	arrowLight = loadImage("../img/arrow_right_light.png");
	
	nodeIdle.resize(4 * grid.SQUARE, 4 * grid.SQUARE);
	nodeHover.resize(4 * grid.SQUARE, 4 * grid.SQUARE);
}

function setup() {
	WIDTH = displayWidth;
	HEIGHT = displayHeight;
	createCanvas(WIDTH, HEIGHT);
	
	// create a random ball
	// grid.balls.push(new Ball());
	
	// some settings
	angleMode(DEGREES);
	ballColor = color(255);
	targetColor = color(230, 30, 30);
	
	// createRandomLevel();
	grid = new Grid();
	box = new addBox();
	
	resizeImgs();
	
	mouseLocation = createVector(mouseX, mouseY);
}

function draw() {
	mouseLocation = createVector(mouseX, mouseY);
	
	background(10);
	noStroke();
    fill(255);
	
	// display points
	/*fill(255);
	textSize(32);
	text("Walls Hit: " + hits, 10, 30);*/
	
	grid.render();
	box.render();
	
	if (gameOver) {
		fill(color(0, 0, 0, 150));
		rect(0, 0, WIDTH, HEIGHT);
		fill(255);
		textAlign(CENTER);
		textSize(200);
		text("GAME OVER", WIDTH / 2, HEIGHT / 2);
		noLoop();
	}
}

function mousePressed() {
	box.check(mouseLocation);
	grid.check(mouseLocation);
}

function Grid() {
	this.SQUARE = 10;
	this.SQUAREMOBILE = 5;
	this.OFFSET = createVector(3, 3);
	this.LOCATION = createVector(0, 0);
	this.SIZE = createVector(WIDTH, HEIGHT);
	
	if (WIDTH <= 720) this.SQUARE = this.SQUAREMOBILE;
	
	this.balls = [];
	this.nodes = [];
	this.targets = [];
	
	this.ballSize = 2 * this.SQUARE;
	this.targetSize = createVector(4, 4).mult(this.SQUARE);
	
	this.mouseToGrid = function(location) {
		var objectLocation = location.copy().sub(this.OFFSET); // ATENTION: NOT USING this.LOCATION
		var gridLocation = createVector(Math.floor(objectLocation.x / this.SQUARE) * this.SQUARE, Math.floor(objectLocation.y / this.SQUARE) * this.SQUARE);
		gridLocation.add(this.OFFSET);
		
		return gridLocation;
	}
	
	this.addBall = function(location) {
		var gridLocation = this.mouseToGrid(location);
		
		this.balls.push(new Ball(gridLocation, this.ballSize));
	}
	
	this.addNode = function(location) {
		var gridLocation = this.mouseToGrid(location.copy().sub(grid.SQUARE * 2, grid.SQUARE * 2));
		
		this.nodes.push(new Node(gridLocation));
	}
	
	this.addTarget = function(location) {
		var gridLocation = this.mouseToGrid(location);
		
		this.targets.push(new Target(gridLocation, this.targetSize));
	}
	
	this.save = function() {
		var json = [];
		
		var objGrid = {
			object: "grid",
			square: this.SQUARE,
			squaremobile: this.SQUAREMOBILE
		};
		
		json.push(objGrid);
		
		for (var i = 0; i < this.balls.length; ++i) {
			var obj = {
				object: "ball",
				locationX: this.balls[i].LOCATION.x,
				locationY: this.balls[i].LOCATION.y,
				diameter: this.balls[i].DIAMETER,
				//fill: this.balls[i].FILL,
				speed: this.balls[i].SPEED,
				accX: this.balls[i].ACCELERATION.x,
				accY: this.balls[i].ACCELERATION.y
			};
			
			json.push(obj);
		}
		
		for (var i = 0; i < this.nodes.length; ++i) {
			// some notes about common info: this.ACTIVE is always false in gameStatus = 0
			var obj = {
				object: "node",
				locationX: this.nodes[i].LOCATION.x,
				locationY: this.nodes[i].LOCATION.y,
				sizeX: this.nodes[i].SIZE.x,
				sizeY: this.nodes[i].SIZE.y,
				wallThickness: this.nodes[i].wallThickness,
				wallDistance: this.nodes[i].wallDistance,
				wallLenght: this.nodes[i].wallLenght
			};
			
			json.push(obj);
		}
		
		for (var i = 0; i < this.targets.length; ++i) {
			var obj = {
				object: "target",
				locationX: this.targets[i].LOCATION.x,
				locationY: this.targets[i].LOCATION.y,
				diameterX: this.targets[i].DIAMETER.x,
				diameterY: this.targets[i].DIAMETER.y
				//fill: this.targets[i].FILL
			};
			
			json.push(obj);
		}
		
		return json;
	}
	
	this.load = function(json) {		
		for (var i = 0; i < json.length; ++i) {			
			if (json[i].object == "grid") {
				this.SQUARE = json[i].square;
				this.SQUAREMOBILE = json[i].squaremobile;
			}
			
			if (json[i].object == "ball") {
				this.addBall(createVector(json[i].locationX, json[i].locationY));
				this.balls[this.balls.length - 1].DIAMETER = json[i].diameter;
				this.balls[this.balls.length - 1].SPEED = json[i].speed;
				this.balls[this.balls.length - 1].ACCELERATION = createVector(json[i].accX, json[i].accY);
			}
			
			if (json[i].object == "node") {
				this.addNode(createVector(json[i].locationX, json[i].locationY));
				this.nodes[this.nodes.length - 1].SIZE = createVector(json[i].sizeX, json[i].sizeY);
				this.nodes[this.nodes.length - 1].wallThickness = json[i].wallThickness;
				this.nodes[this.nodes.length - 1].wallDistance = json[i].wallDistance;
				this.nodes[this.nodes.length - 1].wallLenght = json[i].wallLenght;
			}
			
			if (json[i].object == "target") {
				this.addTarget(createVector(json[i].locationX, json[i].locationY));
				this.targets[this.targets.length - 1].DIAMETER = createVector(json[i].diameterX, json[i].diameterY);
			}
		}
	}
	
	this.check = function() {
		for (var i = 0; i < this.nodes.length; ++i) {
			this.nodes[i].check();
		}
		
		for (var i = 0; i < this.balls.length; ++i) {
			this.balls[i].check();
		}
	}
	
	this.render = function() {
		var nLinesX = WIDTH - this.OFFSET.x / this.SQUARE;
		var nLinesY = HEIGHT - this.OFFSET.y / this.SQUARE;
		
		stroke(200, 50);
		
		for (var i = 0; i < nLinesX; ++i) {
			var X = this.LOCATION.x + this.OFFSET.x + i * this.SQUARE;
			line(X, 0, X, this.LOCATION.y + this.SIZE.y);
		}
		
		for (var i = 0; i < nLinesY; ++i) {
			var Y = this.LOCATION.y + this.OFFSET.y + i * this.SQUARE;
			line(0, Y, this.LOCATION.x + this.SIZE.x, Y);
		}
		
		for (var i = 0; i < this.nodes.length; ++i) {
			this.nodes[i].render();
			for (var b = 0; b < this.balls.length; ++b) {
				this.nodes[i].checkWalls(b);
			}
		}
		
		for (var i = 0; i < this.targets.length; ++i) {
			this.targets[i].render();
		}
		
		for (var i = 0; i < this.balls.length; ++i) {
			if (gameStatus == 1) this.balls[i].update();
			this.balls[i].render();
		}
	}
}

function addBox() {
	this.SIZE = createVector(372, 60);
	this.SIZEMOBILE = createVector(0, 0);
	this.LOCATION = createVector(5, 5);
	this.LOCATIONMOBILE = createVector(0, 0);
	
	this.buttonSpaceY = createVector(0, 8);
	this.buttonSpaceX = createVector(8, 0);
	this.buttonSpace = createVector(8, 8);
	this.buttonSizeX = createVector(44, 0);
	this.buttonSizeY = createVector(0, 44);
	this.buttonSize = createVector(44, 44);
	
	this.nodeButtonLocation = this.LOCATION.copy().add(this.buttonSpace);
	this.ballButtonLocation = this.nodeButtonLocation.copy().add(this.buttonSizeX).add(this.buttonSpaceX);
	this.targetButtonLocation = this.ballButtonLocation.copy().add(this.buttonSizeX).add(this.buttonSpaceX);
	this.saveButtonLocation = this.targetButtonLocation.copy().add(this.buttonSizeX).add(this.buttonSpaceX);
	this.loadButtonLocation = this.saveButtonLocation.copy().add(this.buttonSizeX).add(this.buttonSpaceX);
	this.playButtonLocation = this.loadButtonLocation.copy().add(this.buttonSizeX).add(this.buttonSpaceX);
	this.resetButtonLocation = this.playButtonLocation.copy().add(this.buttonSizeX).add(this.buttonSpaceX);
	
	this.ballEnabled = false;
	this.nodeEnabled = false;
	this.targetEnabled = false;
	this.resetEnabled = false;
	
	this.ballLock = false;
	this.nodeLock = false;
	this.targetLock = false;
	
	this.check = function(inputPosition) {
		if (this.ballEnabled == false && this.nodeEnabled == false && this.targetEnabled == false) {
			if (RECTCHECK(this.ballButtonLocation, this.buttonSize, inputPosition)) {
				this.ballEnabled = true;
			} else if (RECTCHECK(this.nodeButtonLocation, this.buttonSize, inputPosition)) {
				this.nodeEnabled = true;
			} else if (RECTCHECK(this.targetButtonLocation, this.buttonSize, inputPosition)) {
				this.targetEnabled = true;
			} else if (RECTCHECK(this.playButtonLocation, this.buttonSize, inputPosition)) {
				gameStatus = 1;
			} else if (RECTCHECK(this.saveButtonLocation, this.buttonSize, inputPosition)) {
				saveJSON(grid.save(), "game.json");
			} else if (RECTCHECK(this.loadButtonLocation, this.buttonSize, inputPosition)) {				
				if (uploadedFile == false) {
					$("#inputFile").trigger("click");
					uploadedFile = true;
				} else {
					var files = document.getElementById("inputFile").files;
					console.log(files);
					/*if (files == null) {
						console.log("File's empty");
						return false;
					}*/
					
					var fr = new FileReader();
					
					fr.onload = function(e) { 
						var result = fr.result;
						
						grid = new Grid();
						console.log(result);
						grid.load(JSON.parse(result));
					}
					
					fr.readAsText(files[0]);
					
					uploadedFile = false;
				}
			} else if (RECTCHECK(this.resetButtonLocation, this.buttonSize, inputPosition)) {
				this.resetEnabled = true;
				grid = new Grid();
				gameStatus = 0;
			}
		} else {
			if (this.ballEnabled && !this.ballLock) {
				grid.addBall(inputPosition);
				this.ballEnabled = false;
			} else if (this.nodeEnabled && !this.nodeLock) {
				grid.addNode(inputPosition);
				this.nodeEnabled = false;
			} else if (this.targetEnabled && !this.targetLock) {
				grid.addTarget(inputPosition);
				this.targetEnabled = false;
			}
		}
	}
	
	this.render = function() {
		if (gameStatus != 0) return false;
		
		fill(color(0, 19, 51));
		noStroke();
		
		RECT(this.LOCATION, this.SIZE);
		
		if (this.nodeEnabled) IMAGEN(nodeImageClicked, this.nodeButtonLocation);
		else if (RECTCHECK(this.nodeButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(nodeImageHover, this.nodeButtonLocation);
		else IMAGEN(nodeImageIdle, this.nodeButtonLocation);
		
		if (this.ballEnabled) IMAGEN(ballImageClicked, this.ballButtonLocation, this.buttonSize);
		else if (RECTCHECK(this.ballButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(ballImageHover, this.ballButtonLocation);
		else IMAGEN(ballImageIdle, this.ballButtonLocation);
		
		if (this.targetEnabled) IMAGEN(targetImageClicked, this.targetButtonLocation);
		else if (RECTCHECK(this.targetButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(targetImageHover, this.targetButtonLocation);
		else IMAGEN(targetImageIdle, this.targetButtonLocation);
		
		if (RECTCHECK(this.saveButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(saveImageHover, this.saveButtonLocation);
		else IMAGEN(saveImageIdle, this.saveButtonLocation);
		
		if (RECTCHECK(this.loadButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(loadImageHover, this.loadButtonLocation);
		else IMAGEN(loadImageIdle, this.loadButtonLocation);
		
		if (RECTCHECK(this.playButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(playImageHover, this.playButtonLocation);
		else if (gameStatus != 1) IMAGEN(playImageIdle, this.playButtonLocation);
		else IMAGEN(playImageClicked, this.playButtonLocation);
		
		if (this.resetEnabled) {
			IMAGEN(resetImageClicked, this.resetButtonLocation);
			this.resetEnabled = false;
		} else if (RECTCHECK(this.resetButtonLocation, this.buttonSize, mouseLocation))
			IMAGEN(resetImageHover, this.resetButtonLocation);
		else IMAGEN(resetImageIdle, this.resetButtonLocation);
		
		var gridLocation = grid.mouseToGrid(mouseLocation);
		
		if (this.ballEnabled) {
			var ballSizeV = createVector(grid.ballSize, grid.ballSize);
			
			if (!tryPuttingObj(gridLocation, ballSizeV, createVector(0, 0))) {
				this.ballLock = true;
				stroke(color(230, 50, 50));
				strokeWeight(10);
			} else this.ballLock = false;
			
			fill(ballColor, 50);
			ELL(gridLocation, ballSizeV);
		}
		
		if (this.targetEnabled) {
			if (!tryPuttingObj(gridLocation.copy().sub(grid.targetSize.copy().mult(0.5)), grid.targetSize, createVector(0, 0))) {
				this.targetLock = true;
				stroke(color(230, 230, 230));
				strokeWeight(10);
			} else this.targetLock = false;
			
			fill(targetColor, 50);
			ELL(gridLocation, grid.targetSize);
		}
	}
}

/*
function nodeBox(location, color) {
	this.LOCATION = location;
	this.SIZE = 0;
	this.COLOR = color;
	
	this.render = function() {
		
	}
}*/

function AC(color1, alpha1) { return color(red(color1), green(color1), blue(color1), alpha1); }
function SIZE(relative) { return (WIDTH * HEIGHT) * relative / (1920 * 1080); }
function DIST(vector1, vector2) { return dist(vector1.x, vector1.y, vector2.x, vector2.y); }
function RECT(location, size) { rect(location.x, location.y, size.x, size.y); }
function IMAGE(theImage, location, size) { image(theImage, location.x, location.y, size.x, size.y); }
function IMAGEN(theImage, location) { image(theImage, location.x, location.y); }
function ELL(location, size) { ellipse(location.x, location.y, size.x, size.y); }
function LINE(location1, location2) { line(location1.x, location1.y, location2.x, location2.y); }
function RECTCHECK(location, size, inputLocation) {
	if (inputLocation.x >= location.x && inputLocation.x <= location.x + size.x && inputLocation.y >= location.y && inputLocation.y <= location.y + size.y)
		return true;
	return false;
}

function createRandomLevel() {
	var numberOfNodes = random(1, 15);
	var numberOfTargets = random(1, 10);
	for (var i = 0; i < numberOfNodes; ++i) {
		grid.nodes.push(new Node());
	}
	
	for (var i = 0; i < numberOfTargets; ++i) {
		grid.targets.push(new Target());
	}
}

function Ball(location, diameter) {
	this.LOCATION = location;
	this.DIAMETER = diameter;
	this.FILL = ballColor;
	this.SPEED = 0.1;
	this.ACCELERATION = createVector(random(-10, 10), random(-10, 10));
	this.VELOCITY = createVector(0, 0);
	this.GEAR = false;
	
	this.TRUESIZE = createVector(this.DIAMETER, this.DIAMETER);
	this.TRUELOCATION = this.LOCATION.copy().sub(this.TRUESIZE.copy().mult(0.5));
	
	this.update = function() {		
		this.ACCELERATION.setMag(this.SPEED);
		this.VELOCITY.add(this.ACCELERATION);
		this.LOCATION.add(this.VELOCITY);
		this.VELOCITY.limit(5);
		
		for (var i = 0; i < grid.targets.length; ++i) {
			if (RECTCHECK(this.LOCATION, this.TRUESIZE, grid.targets[i].LOCATION, createVector(grid.targets[i].DIAMETER, grid.targets[i].DIAMETER))) {
				gameStatus = 2;
			}
		}
	}
	
	this.hit = function(point1, point2) {
		var dx = abs(point1.x - point2.x);
		var dy = abs(point1.y - point2.y);
		
		if (dx == 0) {
			this.ACCELERATION = createVector(-this.ACCELERATION.x, this.ACCELERATION.y);
			this.VELOCITY = createVector(-this.VELOCITY.x, this.VELOCITY.y);
		} else if (dy == 0) {
			this.ACCELERATION = createVector(this.ACCELERATION.x, -this.ACCELERATION.y);
			this.VELOCITY = createVector(this.VELOCITY.x, -this.VELOCITY.y);
		}
		
		/*
		var normalPoint1 = createVector(-dy, dx);
		var normalPoint2 = createVector(dy, -dx);
		
		stroke(180);
		line(point1.x + normalPoint1.x, point1.y + normalPoint1.y, point1.x, point1.y);
		
		normalPoint1.normalize();
		normalPoint2.normalize();*/
		
		/*this.ACCELERATION.normalize();
		
		var dotProductAcc = this.ACCELERATION.dot(normalPoint1);
		dotProductAcc *= 2;
		var normalPoint1MultAcc = normalPoint1.copy();
		normalPoint1MultAcc.mult(dotProductAcc);
		
		this.ACCELERATION.add(normalPoint1MultAcc);
		
		this.VELOCITY.normalize();
		
		var dotProductVel = this.VELOCITY.dot(normalPoint1);
		dotProductVel *= 2;
		var normalPoint1MultVel = normalPoint1.copy();
		normalPoint1MultVel.mult(dotProductVel);
		
		this.VELOCITY.add(normalPoint1MultVel);*/
	}
	
	this.check = function() {
		if (this.GEAR == false) {
			if (RECTCHECK(this.TRUELOCATION, this.TRUESIZE, mouseLocation)) {
				this.GEAR = true;
			}
		} else {
			this.ACCELERATION = mouseLocation.copy().sub(this.LOCATION);
			this.GEAR = false;
		}
	}
	
	this.render = function() {
		this.TRUESIZE = createVector(this.DIAMETER, this.DIAMETER);
		this.TRUELOCATION = this.LOCATION.copy().sub(this.TRUESIZE.copy().mult(0.5));
		
		fill(this.FILL);
		noStroke();
		ELL(this.LOCATION, this.TRUESIZE);
		
		// line for the vector
		strokeWeight(5);
		stroke(color(255, 150, 150));
		
		if (this.GEAR) {
			LINE(this.LOCATION, mouseLocation);
		} else {
			LINE(this.LOCATION, this.LOCATION.copy().add(this.ACCELERATION));
		}
		
		
		if (gameStatus == 0 && RECTCHECK(this.TRUELOCATION, this.TRUESIZE, mouseLocation)) {		
			IMAGE(gearMark, this.TRUELOCATION, this.TRUESIZE);
		}
		
		/*
		var newAcc = this.ACCELERATION.copy();
		newAcc.mult(250);
		
		var newVel = this.VELOCITY.copy();
		newVel.mult(20);*/
	}
}

function Wall(location, size, color) {
	this.LOCATION = location;
	this.SIZE = size;
	this.points = [4];
	this.TYPE = 0;
	this.INDEX = 0;
	this.COLOR = color;
	this.ACTIVE = true;
	
	this.render = function(active, opacity) {
		if (this.ACTIVE) {
			if (!active) fill(AC(this.COLOR, opacity));
			else fill(this.COLOR);
			noStroke();
			RECT(this.LOCATION, this.SIZE);
		}
	}
	
	this.findPoints = function() {
		this.points[0] = this.LOCATION;
		this.points[1] = createVector(this.points[0].x + this.SIZE.x, this.points[0].y);
		this.points[2] = createVector(this.points[1].x, this.points[1].y + this.SIZE.y);
		this.points[3] = createVector(this.points[0].x, this.points[0].y + this.SIZE.y);
	}
	
	this.update = function(newLocation, newSize) {
		this.LOCATION = newLocation;
		this.SIZE = newSize;
	}
}

function Corner() {
	this.LOCATION = createVector(0, 0);
	this.SIZE = createVector(0, 0);
	this.ACTIVE = true;
	
	this.update = function(location, size) {
		this.LOCATION = location;
		this.SIZE = size;
	}
	
	this.check = function() {
		return RECTCHECK(this.LOCATION, this.SIZE, mouseLocation);
	}
}

function Extender(location, size, degree, offset) {
	this.LOCATION = location;
	this.SIZE = size;
	this.DEGREE = degree; // 0 - right; 90 - bottom; 180 - left; 270 - top
	this.OFFSET = offset;
	
	this.update = function(newLocation, newSize) {
		this.LOCATION = newLocation;
		this.SIZE = newSize;
	}
	
	this.render = function() {
		if (RECTCHECK(this.LOCATION, this.SIZE, mouseLocation)) {
			push();
			translate(this.LOCATION.x + this.OFFSET.x, this.LOCATION.y + this.OFFSET.y);
			rotate(this.DEGREE);
			IMAGE(arrowLight, createVector(0, 0), this.SIZE);
			pop();
		}
	}
	
	this.check = function() {
		return RECTCHECK(this.LOCATION, this.SIZE, mouseLocation);
	}
}

function Node(location) {
	this.LOCATION = location;

	this.SIZE = createVector(grid.SQUARE * 4, grid.SQUARE * 4);
	
	this.wallDistance = grid.SQUARE * 2;
	this.wallThickness = grid.SQUARE;
	this.wallLenght = grid.SQUARE * 4;
	
	var distanceThickness, territorySizeX, territorySizeY;
	this.territorySize;
	this.territoryLocation;
	
	this.WALLS = [];
	this.CORNERS = [4];
	this.EXTENDERS = [];
	this.ACTIVE = false;
	this.COLOR = color(random(1, 255), random(1, 255), random(1, 255));
	
	// put empty corner objects into the array
	this.cornerPush = function() {
		for (var i = 0; i < 4; ++i) this.CORNERS[i] = new Corner();
	}
	
	this.cornerPush();
	
	// depending on the corner and it's location, update it
	this.cornerUpdate = function(corner, location) {
		if (corner < 90)
			this.CORNERS[0].update(location, createVector(grid.SQUARE, grid.SQUARE));
		else if (corner >= 90 && corner < 180)
			this.CORNERS[1].update(location.copy().add(createVector(0, -grid.SQUARE)), createVector(grid.SQUARE, grid.SQUARE));
		else if (corner >= 180 && corner < 270)
			this.CORNERS[2].update(location.copy().add(createVector(-grid.SQUARE, -grid.SQUARE)), createVector(grid.SQUARE, grid.SQUARE));
		else
			this.CORNERS[3].update(location.copy().add(createVector(-grid.SQUARE, 0)), createVector(grid.SQUARE, grid.SQUARE));
	}
	
	this.addExtenders = function() {
		var nodeCenter = this.LOCATION.copy().add(this.SIZE.copy().mult(0.5));
		var extSize = createVector(grid.SQUARE, grid.SQUARE);
		
		// RIGHT
		var offsetR = createVector(0, extSize.y / 2);
		var extLocation = nodeCenter.copy().add(createVector(this.SIZE.x / 2 + distanceThickness, 0)).sub(offsetR);
		if (this.EXTENDERS[0] === undefined) {
			this.EXTENDERS.push(new Extender(extLocation, extSize, 0, offsetR));
		} else {
			this.EXTENDERS[0].update(extLocation, extSize);
		}
		
		// LEFT
		var offsetL = createVector(extSize.x / 2, extSize.y / 2);
		extLocation = nodeCenter.copy().sub(createVector(this.SIZE.x / 2 + distanceThickness, 0)).sub(offsetL);
		if (this.EXTENDERS[1] === undefined) {
			this.EXTENDERS.push(new Extender(extLocation, extSize, 180, offsetL));
		} else {
			this.EXTENDERS[1].update(extLocation, extSize);
		}
		
		// DOWN
		var offsetD = createVector(extSize.x / 2, 0);
		extLocation = nodeCenter.copy().add(createVector(0, this.SIZE.y / 2 + distanceThickness)).sub(offsetD);
		if (this.EXTENDERS[2] === undefined) {
			this.EXTENDERS.push(new Extender(extLocation, extSize, 90, offsetD));
		} else {
			this.EXTENDERS[2].update(extLocation, extSize);
		}
		
		// UP
		var offsetU = createVector(extSize.x / 2, extSize.y / 2);
		extLocation = nodeCenter.copy().sub(createVector(0, this.SIZE.y / 2 + distanceThickness)).sub(offsetU);
		if (this.EXTENDERS[3] === undefined) {
			this.EXTENDERS.push(new Extender(extLocation, extSize, 270, offsetU));
		} else {
			this.EXTENDERS[3].update(extLocation, extSize);
		}
	}
	
	this.barrierPush = function(corner, distance, wallThickness, wallLenght, wallSet) {
		var location = createVector(this.LOCATION.x - distance - wallThickness, this.LOCATION.y - distance - wallThickness);
		
		var nodeCenter = createVector(this.LOCATION.x + this.SIZE.x / 2, this.LOCATION.y + this.SIZE.y / 2);
		var newLocationX = nodeCenter.x + (location.x - nodeCenter.x) * cos(corner) + (location.y - nodeCenter.y) * sin(corner);
		var newLocationY = nodeCenter.y - (location.x - nodeCenter.x) * sin(corner) + (location.y - nodeCenter.y) * cos(corner);
		var newLocation = createVector(newLocationX, newLocationY);
		
		this.cornerUpdate(corner, newLocation);
		
		var wallSize1 = createVector(wallThickness, wallLenght);
		var wallSize2 = createVector(wallLenght, wallThickness);
		
		corner /= 90;
		
		if (corner == 1) { wallSize2.y = -wallSize2.y; wallSize1.y = -wallSize1.y; }
		else if (corner == 2) { wallSize1.y = -wallSize1.y; wallSize1.x = -wallSize1.x; wallSize2.x = -wallSize2.x; wallSize2.y = -wallSize2.y; }
		else if (corner == 3) { wallSize1.x = -wallSize1.x; wallSize2.x = -wallSize2.x; }
		
		if (this.WALLS[wallSet * 2] === undefined) {
			this.WALLS.push(new Wall(newLocation, wallSize1, this.COLOR));
			this.WALLS.push(new Wall(newLocation, wallSize2, this.COLOR));
		} else {
			// if it's already defined
			this.WALLS[wallSet * 2].update(newLocation, wallSize1);
			this.WALLS[wallSet * 2 + 1].update(newLocation, wallSize2);
		}
		
		this.WALLS[this.WALLS.length - 1].findPoints();
		this.WALLS[this.WALLS.length - 2].findPoints();
	}
	
	this.createWalls = function() {
		this.barrierPush(0, this.wallDistance, this.wallThickness, this.wallLenght, 0);
		this.barrierPush(90, this.wallDistance, this.wallThickness, this.wallLenght, 1);
		this.barrierPush(180, this.wallDistance, this.wallThickness, this.wallLenght, 2);
		this.barrierPush(270, this.wallDistance, this.wallThickness, this.wallLenght, 3);
		
		this.addExtenders();
	}
	
	this.updateTerritory = function(newWallDistance, newWallThickness) {
		this.wallDistance = newWallDistance;
		this.wallThickness = newWallThickness;
		
		distanceThickness = this.wallDistance + this.wallThickness; // update the distanceThickness
		
		// update the territorySize
		territorySizeX = distanceThickness * 2 + this.SIZE.x;
		territorySizeY = distanceThickness * 2 + this.SIZE.y;
		this.territorySize = createVector(territorySizeX, territorySizeY);
		
		// update the territoryLocation
		this.territoryLocation = this.LOCATION.copy().sub(createVector(distanceThickness, distanceThickness));
	
		this.createWalls();
	}
	
	this.updateTerritory(grid.SQUARE * 2, grid.SQUARE);
	
	this.checkWalls = function(ballIndex) {
		if (!this.ACTIVE) return false;
		
		var ballLocation = grid.balls[ballIndex].LOCATION;
		var ballSize = createVector(grid.balls[ballIndex].DIAMETER, grid.balls[ballIndex].DIAMETER);
		
		for (var i = 0; i < this.WALLS.length; ++i) {
			var wallLocation = this.WALLS[i].LOCATION;
			var wallSize = this.WALLS[i].SIZE;
			var points = this.WALLS[i].points;
			
			for (var j = 0; j < 4; ++j) {
				var point1 = points[j];
				var point2 = points[(j != 3) ? j + 1 : 0];
				
				var dx = abs(point1.x - ballLocation.x);
				var dy = abs(point1.y - ballLocation.y);
				
				var threshold = 1;
				
				if (dx > ballSize.x / 2 - threshold && dx < ballSize.x / 2 + threshold && ballLocation.y + ballSize.y > point1.y && ballLocation.y -  ballSize.y < point2.y) {
					grid.balls[ballIndex].hit(point1, point2);
					hits++;
					break;
				} else if (dy > ballSize.y / 2 - threshold && dy < ballSize.y / 2 + threshold && ballLocation.x + ballSize.y > point1.x && ballLocation.x  -  ballSize.y < point2.x) {
					grid.balls[ballIndex].hit(point1, point2);
					hits++;
					break;
				}
			}
		}
	}
	
	this.check = function() {
		// check for mouse press on the node itself
		if (gameStatus != 0) {
			if (RECTCHECK(this.LOCATION, this.SIZE, mouseLocation)) {
				this.ACTIVE = !this.ACTIVE;
			}
		}
		
		// check for mouse press on the corners
		for (var i = 0; i < this.CORNERS.length; ++i) {
			if (this.CORNERS[i].check()) {
				if (this.CORNERS[i].ACTIVE == true) {
					this.CORNERS[i].ACTIVE = false;
					this.WALLS[i * 2].ACTIVE = false;
					this.WALLS[i * 2 + 1].ACTIVE = false;
				} else {
					this.CORNERS[i].ACTIVE = true;
					this.WALLS[i * 2].ACTIVE = true;
					this.WALLS[i * 2 + 1].ACTIVE = true;
				}
			}
		}
		
		// check for mouse press on the extenders
		for (var i = 0; i < this.EXTENDERS.length; ++i) {
			if (this.EXTENDERS[i].check()) {
				this.wallDistance += grid.SQUARE;
				this.updateTerritory(this.wallDistance, this.wallThickness);
			}
		}
	}
	
	this.render = function() {
		noStroke();
		
		var opacity = 255;
		if (!this.ACTIVE) opacity = 80;
		
		// render the territory mark
		var fromColor = this.COLOR;
		var toColor = color(0, 0, 0);
		var combinedColor = lerpColor(fromColor, toColor, .95);
		var alphaColor = AC(combinedColor, opacity);
		fill(alphaColor);
		rect(this.territoryLocation.x, this.territoryLocation.y, this.territorySize.x, this.territorySize.y);
				
		tint(this.COLOR, 50);
		if (RECTCHECK(this.LOCATION, this.SIZE, mouseLocation)) {
			IMAGEN(nodeHover, this.LOCATION);
		} else IMAGEN(nodeIdle, this.LOCATION);
		noTint();
		
		// render each wall
		for (var i = 0; i < this.WALLS.length; ++i) {
			this.WALLS[i].render(this.ACTIVE, opacity);
		}
		
		if (gameStatus == 0) {
			// render each extender
			for (var i = 0; i < this.EXTENDERS.length; ++i) {
				this.EXTENDERS[i].render();
			}
		
			// render buttons for adjusting the node itself
			for (var i = 0; i < this.CORNERS.length; ++i) {
				if (this.CORNERS[i].check()) {
					if (this.CORNERS[i].ACTIVE == true) {
						IMAGE(crossMark, this.CORNERS[i].LOCATION, this.CORNERS[i].SIZE);
					} else {
						IMAGE(plusMarkLight, this.CORNERS[i].LOCATION, this.CORNERS[i].SIZE);
					}
				}
			}
		}
	}
}

function isIntersect(locationObj1, sizeObj1, locationObj2, sizeObj2) {
	var intersectX = false;
	var intersectY = false;
	
	if (locationObj1.x + sizeObj1.x >= locationObj2.x && locationObj1.x <= locationObj2.x + sizeObj2.x) intersectX = true;
	if (locationObj1.y + sizeObj1.y >= locationObj2.y && locationObj1.y <= locationObj2.y + sizeObj2.y) intersectY = true;
	
	if (intersectX && intersectY) return true;
	return false;
}

function tryPuttingObj(location, TerritorySize, margin) {
	var LOCATION = location.copy();
	// MARGINS NOT USED
	
	var dontIntersect = true;
	
	// loops through every other object to check whether they intersect
	for (var i = 0; i < grid.nodes.length; ++i) {
		var testNodeLocation = grid.nodes[i].territoryLocation;
		var testNodeSize = grid.nodes[i].territorySize;
		
		if (isIntersect(LOCATION, TerritorySize, testNodeLocation, testNodeSize)) {
			dontIntersect = false;
			break;
		}
	}
	
	if (dontIntersect == false) return false;
	
	for (var i = 0; i < grid.balls.length; ++i) {
		var testBallSize = createVector(grid.balls[i].DIAMETER, grid.balls[i].DIAMETER);
		var testBallLocation = grid.balls[i].LOCATION.copy().sub(testBallSize / 2);
		
		if (isIntersect(LOCATION, TerritorySize, testBallLocation, testBallSize)) {
			dontIntersect = false;
			break;
		}
	}
	
	if (dontIntersect == false) return false;
	
	for (var i = 0; i < grid.targets.length; ++i) {
		var testBallSize = grid.targets[i].DIAMETER;
		var testBallLocation = grid.targets[i].LOCATION.copy().sub(testBallSize / 2);
		
		if (isIntersect(LOCATION, TerritorySize, testBallLocation, testBallSize)) {
			dontIntersect = false;
			break;
		}
	}
	
	if (dontIntersect) return true;
	return false;
}

function Target(location, size) {
	this.LOCATION = location;
	this.DIAMETER = size;
	this.FILL = targetColor;
	
	this.check = function(ballIndex) {
		var ballLocation = grid.balls[ballIndex].LOCATION.copy();
		var ballDiameter = grid.balls[ballIndex].DIAMETER;
		
		var distance = DIST(this.LOCATION, ballLocation);
		var threshold = SIZE(2);
		
		if (distance - threshold < ballDiameter) gameOver = true;
	}
	
	this.render = function() {
		fill(this.FILL);
		noStroke();
		ellipse(this.LOCATION.x, this.LOCATION.y, this.DIAMETER.x, this.DIAMETER.y);
	}
}