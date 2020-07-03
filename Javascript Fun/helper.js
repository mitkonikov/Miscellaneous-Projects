function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function isIntersect(locationObj1, sizeObj1, locationObj2, sizeObj2) {
	let intersectX = false;
	let intersectY = false;
	
	if (locationObj1.x + sizeObj1.x >= locationObj2.x && locationObj1.x <= locationObj2.x + sizeObj2.x) intersectX = true;
	if (locationObj1.y + sizeObj1.y >= locationObj2.y && locationObj1.y <= locationObj2.y + sizeObj2.y) intersectY = true;
	
	if (intersectX && intersectY) return true;
	return false;
}

function rectVector(positionVector, sizeVector) {
    rect(positionVector.x, positionVector.y, sizeVector.x, sizeVector.y);
}