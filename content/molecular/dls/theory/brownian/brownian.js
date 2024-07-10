let particle, canvas, viscositySlider, temperatureSlider, restartButton;

function setup() {
  canvas = createCanvas(800, 600); // You can change the canvas size here
  canvas.parent('container-brownian'); // Attach the canvas to the div with ID 'container-brownian'

  viscositySlider = createSlider(0.1, 1, 0.5, 0.1);
  viscositySlider.style('width', '200px');

  temperatureSlider = createSlider(50, 500, 300, 50);
  temperatureSlider.style('width', '200px');

  restartButton = createButton('Restart');
  restartButton.mousePressed(startSimulation);
  moveInterface(canvas);

  startSimulation();
}

function moveInterface() {
    viscositySlider.position(canvas.position().x, canvas.position().y);
    temperatureSlider.position(canvas.position().x, canvas.position().y + 30);
    restartButton.position(canvas.position().x + 2, canvas.position().y + 30 * 2);
}

function windowResized(){
  moveInterface(canvas);
}

function draw() {
  background(255);
  text("Viscosity: " + String(viscositySlider.value()), x=220, y=16);
  text("Temperature: " + String(temperatureSlider.value()) + " K", x=220, y=46);
  particle.update();
  particle.display();
}

function startSimulation() {
  let particleSize = 5; // Pixels
  let scaleFactor = 100000000000; // Scaling factor for visibility
  particle = new Particle(particleSize, scaleFactor);
}

class Particle {
  constructor(size, scaleFactor) {
    this.position = createVector(width / 2, height / 2);
    this.size = size;
    this.scaleFactor = scaleFactor;
    this.history = [];
  }

  // Function to update particle position based on Brownian motion
  update() {

    this.viscosity = viscositySlider.value(); // Arbitrary unit
    this.temperature = temperatureSlider.value(); // Kelvin

    let kB = 1.38e-23; // Boltzmann constant
    let deltaT = 1; // Time step

    // Calculate diffusion coefficient
    let D = (kB * this.temperature) / (6 * PI * this.viscosity * this.size);

    // Random displacement based on normal distribution
    let dx = sqrt(2 * D * deltaT) * randomGaussian() * this.scaleFactor;
    let dy = sqrt(2 * D * deltaT) * randomGaussian() * this.scaleFactor;

    this.position.x += dx;
    this.position.y += dy;

    // Enforce periodic boundary conditions
    if (this.position.x < 0) {
      this.position.x += width;
    } else if (this.position.x > width) {
      this.position.x -= width;
    }
    if (this.position.y < 0) {
      this.position.y += height;
    } else if (this.position.y > height) {
      this.position.y -= height;
    }

    // Store position history
    this.history.push(this.position.copy());
    if (this.history.length > 2000) {
      this.history.shift();
    }
  }

  // Function to display the particle and its trail
  display() {
    // Draw the trail with fading transparency
    for (let i = 0; i < this.history.length - 1; i++) {
      let pos1 = this.history[i];
      let pos2 = this.history[i + 1];
      stroke(0, map(i, 0, this.history.length - 1, 0, 255));
      line(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    // Draw the particle
    fill(0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size * 2);
  }
}
