const WIDTH = 1000;
const HEIGHT = 800;
const SIZE = 30;
let TILE_SIZE = undefined;

let TILES = [];
let PLAYER = {
    POSITION: undefined,
    SIZE: undefined,
};

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(60);

    PLAYER.POSITION = createVector(
        getRandomInt(0, WIDTH - SIZE * 2),
        getRandomInt(0, HEIGHT - SIZE * 2)
    );

    PLAYER.SIZE = createVector(SIZE * 2, SIZE * 2);
    TILE_SIZE = createVector(SIZE, SIZE);

    for (let i = 0; i < 10; ++i) {
        TILES.push({
            POSITION: createVector(
                getRandomInt(0, WIDTH - SIZE),
                getRandomInt(0, HEIGHT - SIZE)
            ),
            COLOR: color(0, 0, 0) // start with black color
        });
    }

    TILES.push({
        POSITION: createVector(PLAYER.POSITION.x, PLAYER.POSITION.y + SIZE * 2),
        COLOR: color(255, 255, 30)
    });
}

let velocity = 0;
let accel = 0.5;
let gameOver = false;

function draw() {
    if (!gameOver) {
        clear();
        noStroke();

        for (let i = 0; i < TILES.length; ++i) {
            fill(TILES[i].COLOR);
            rectVector(TILES[i].POSITION, TILE_SIZE);
        }

        fill(255, 50, 50);
        rectVector(PLAYER.POSITION, PLAYER.SIZE);

        let onGround = true;

        // for (let i = 0; i < TILES.length; ++i) {
        //     if (TILES[i].Y - PLAYER.POSITION.y - SIZE * 2 < 3) {
        //         onGround = true;
        //         break;
        //     }
        // }

        if (!onGround) {
            velocity += accel;

            if (PLAYER.POSITION.y > HEIGHT) {
                alert("GAME OVER");
                gameOver = true;
            }

            PLAYER.POSITION.add(createVector(0, velocity));
        }
    }
}

function keyPressed() {
    let plusX = 0;
    let plusY = 0;
    let accel = 10;

    if (keyCode === UP_ARROW) {
        plusY -= accel;
    } else if (keyCode === DOWN_ARROW) {
        plusY += accel;
    } else if (keyCode === LEFT_ARROW) {
        plusX -= accel;
    } else if (keyCode === RIGHT_ARROW) {
        plusX += accel;
    } else {
        return null;
    }

    let newVector = createVector(plusX, plusY);
    for (let i = 0; i < TILES.length; ++i) {
        if (
            isIntersect(
                PLAYER.POSITION.copy().add(newVector),
                PLAYER.SIZE,
                TILES[i].POSITION,
                TILE_SIZE
            )
        ) {
            TILES[i].COLOR = color(255, 255, 30);
            return false;
        }
    }

    PLAYER.POSITION.add(newVector);
}
