let images = {};
let sounds = {};
let fenceHeight = 200;
let fenceX1, fenceX2;
let sheep = [];
let sky = [];

function preload() {
    images = {
        muddySheep: loadImage('assets/dombalumpur.png'),
        foamySheep: loadImage('assets/dombabusa.png'),
        cleanSheep: loadImage('assets/dombabersih.png'),
        background: loadImage('assets/bg.png'),
        fences: loadImage('assets/pagar.png'),
        sky: [
            loadImage('assets/awan1.png'),
            loadImage('assets/awan2.png'),
            loadImage('assets/awan3.png')
        ]
    };
    sounds.sheep = loadSound('assets/domba.mp3');
}

function setup() {
    createCanvas(800, 800);
    fenceX1 = width / 7;
    fenceX2 = 2 * width / 3;

    for (let i = 0; i < 5; i++) {
        sheep.push(new Sheep(-i * 120));
        sky.push(new Sky(width + i * 200));
    }
}

function draw() {
    image(images.background, 0, 0, width, height);
  
    sky.forEach(s => {
        s.update();
        s.display();
    });

    sheep.forEach(s => {
        s.update();
        s.display();
    });

    drawFences();
}

function drawFences() {
    image(images.fences, fenceX1, height - fenceHeight, 250, fenceHeight);
    image(images.fences, fenceX2, height - fenceHeight, 250, fenceHeight);
}

class Sheep {
    constructor(x) {
        this.x = x;
        this.y = height - 300;
        this.size = random(200, 300);
        this.speed = random(1, 3);
        this.image = images.muddySheep;
        this.lastImage = null;
    }

    update() {
        this.x += this.speed;

        if (this.x < fenceX1) {
            this.image = images.muddySheep;
        } else if (this.x < fenceX2) {
            this.image = images.foamySheep;
        } else {
            this.image = images.cleanSheep;
        }

        if (this.image !== this.lastImage) {
            if (this.image === images.muddySheep) {
                sounds.sheep.play();
            }
            this.lastImage = this.image;
        }

        if (this.x > width) {
            this.x = -this.size;
        }
    }

    display() {
        image(this.image, this.x, this.y, this.size, this.size);
    }
}

class Sky {
    constructor(x) {
        this.x = x;
        this.y = random(0, 20);
        this.size = random(200, 400);
        this.speed = random(1, 2);
        this.image = random(images.sky);
    }

    update() {
        this.x -= this.speed;
        if (this.x < -this.size) {
            this.x = width + this.size;
        }
    }

    display() {
        image(this.image, this.x, this.y, this.size, this.size);
    }
}
