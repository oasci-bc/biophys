// Initialize global variables
let canvas;
let lightWave;
let sizeSlider;
let particleNumSlider;
let detectorTop;

// Particle properties
let minParticleNumber = 1;
let maxParticleNumber = 10;
let minParticleSize = 3;
let maxParticleSize = 30;
let minSpeed = 0.1;
let maxSpeed = 15;

// Light properties
let lightAmplitude = 40;

// Containers for objects
let particles = [];
let scatteringWaves = [];

// When particles hit the light wave it will generate a scattering wave.
// We add this delay to reduce the number of scattering waves.
let scatterDelay = 100; // Delay in milliseconds

let waveResolution = 100;
let detectorWidth = 30;

let fps = 60;

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent("light-scatter-container");

  sizeSlider = createSlider(minParticleSize, maxParticleSize, (maxParticleSize - minParticleSize) / 2, 1);
  particleNumSlider = createSlider(minParticleNumber, maxParticleNumber, 3, 1);
  moveInterface();

  addParticles(particleNumSlider.value(), sizeSlider.value());
  lightWave = new LightWave();
  detectorTop = height - detectorWidth;
}

function moveInterface() {
    sizeSlider.position(canvas.position().x, canvas.position().y);
    particleNumSlider.position(canvas.position().x, canvas.position().y + 20);
}

function windowResized(){
    moveInterface(canvas);
  }

function draw() {
  background(255);

  fill(0, 0, 0);
  noStroke();
  text("Size: " + String(sizeSlider.value()), x=180, y=16);
  text("Particle number: " + String(particleNumSlider.value()), x=180, y=36);

  let newSize = sizeSlider.value();
  let newParticleNum = particleNumSlider.value();

  // Adjust particle number.
  let particleNumDiff = newParticleNum - particles.length;
  if (particleNumDiff > 0) {
    addParticles(particleNumDiff, newSize);
  } else if (particleNumDiff < 0) {
    for (let i = 0; i < abs(particleNumDiff); i++) {
      particles.pop();
    }
  }

  // Adjust size and reset scattering waves.
  if (particles.length > 0 && particles[0].r !== newSize) {
    updateParticleSizes(newSize);
    scatteringWaves = []; // Clear all scattering waves when particle size changes
  }

  handleCollisions();

  for (let particle of particles) {
    particle.update();
    particle.display();
    let scattered = lightWave.isScattering(particle);
    if (scattered && millis() - particle.lastScatterTime > scatterDelay) {
      scatteringWaves.push(new ScatteringWave(scattered.hitX, scattered.hitY));
      particle.lastScatterTime = millis();
    }
  }

  lightWave.update();
  lightWave.display();

  for (let wave of scatteringWaves) {
    wave.update();
    wave.display();
    if (wave.radius >= height) {
      wave.startFadeOut();
    }
  }

  // Remove fully faded-out waves
  scatteringWaves = scatteringWaves.filter(wave => wave.alpha > 0);

  // Calculate and draw the interference pattern
  calculateInterference();
}

function addParticles(particleNum, size) {
  for (let i = 0; i < particleNum; i++) {
    particles.push(new Particle(random(width), random(height), size));
  }
}

function updateParticleSizes(newSize) {
  for (let particle of particles) {
    particle.updateSize(newSize);
  }
}

function handleCollisions() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let p1 = particles[i];
      let p2 = particles[j];
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = p1.r + p2.r;

      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let overlap = 0.5 * (minDist - distance);

        // Displace the particles
        p1.x -= overlap * cos(angle);
        p1.y -= overlap * sin(angle);
        p2.x += overlap * cos(angle);
        p2.y += overlap * sin(angle);

        // Calculate new velocities
        let v1 = createVector(p1.vx, p1.vy);
        let v2 = createVector(p2.vx, p2.vy);

        let normal = createVector(dx / distance, dy / distance);
        let tangent = createVector(-normal.y, normal.x);

        let v1n = p5.Vector.dot(normal, v1);
        let v1t = p5.Vector.dot(tangent, v1);
        let v2n = p5.Vector.dot(normal, v2);
        let v2t = p5.Vector.dot(tangent, v2);

        let v1nFinal = v2n;
        let v2nFinal = v1n;

        let v1nFinalVec = p5.Vector.mult(normal, v1nFinal);
        let v1tFinalVec = p5.Vector.mult(tangent, v1t);
        let v2nFinalVec = p5.Vector.mult(normal, v2nFinal);
        let v2tFinalVec = p5.Vector.mult(tangent, v2t);

        p1.vx = v1nFinalVec.x + v1tFinalVec.x;
        p1.vy = v1nFinalVec.y + v1tFinalVec.y;
        p2.vx = v2nFinalVec.x + v2tFinalVec.x;
        p2.vy = v2nFinalVec.y + v2tFinalVec.y;
      }
    }
  }
}

class Particle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedFactor = 80 / r;
    this.vx = random(-0.2, 0.2) * this.speedFactor;
    this.vy = random(-0.2, 0.2) * this.speedFactor;
    this.lastScatterTime = 0;
  }

  setSpeedFactor(r) {
    this.speedFactor = maxSpeed + (minSpeed - maxSpeed) * ((r - minParticleSize) / (maxParticleSize - minParticleSize));
  }

  updateSize(newSize) {
    this.r = newSize;
    this.setSpeedFactor(newSize);
    this.vx = (this.vx / abs(this.vx)) * random(0.2, 0.2) * this.speedFactor;
    this.vy = (this.vy / abs(this.vy)) * random(0.2, 0.2) * this.speedFactor;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > detectorTop - this.r) this.vy *= -1;
  }

  display() {
    fill(0, 150, 255); // Blue particles
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

class LightWave {
  constructor() {
    this.x = 0;
    this.y = height / 2;
    this.amplitude = lightAmplitude;
    this.wavelength = 150; // Adjusted for better visualization
    this.speed = 3; // Slowing down the wave
  }

  update() {
    this.x += this.speed;
    if (this.x > width) {
      this.x = 0;
    }
  }

  display() {
    stroke(255, 255, 0); // Yellow light wave
    strokeWeight(4); // Thicker wave
    noFill();
    beginShape();
    for (let i = 0; i < width; i++) {
      let y = this.y + this.amplitude * sin((TWO_PI / this.wavelength) * (i - this.x));
      vertex(i, y);
    }
    endShape();
  }

  isScattering(particle) {
    let waveY = this.y + this.amplitude * sin((TWO_PI / this.wavelength) * (particle.x - this.x));
    if (abs(particle.y - waveY) < particle.r) {
      let angle = atan2(particle.y - waveY, particle.x - this.x);
      let hitX = particle.x;
      let hitY = waveY;
      return { angle: angle, hitX: hitX, hitY: hitY };
    }
    return null;
  }
}

class ScatteringWave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.speed = 10; // Speed of the scattering wave
    this.alpha = 35; // Initial transparency
    this.fading = false;
  }

  update() {
    this.radius += this.speed / 2;
  }

  startFadeOut() {
    this.fading = true;
  }

  display() {
    if (this.fading) {
      this.alpha -= 2; // Gradually decrease the transparency
    }
    stroke(0, 255, 0, this.alpha);
    noFill();
    ellipse(this.x, this.y, this.radius * 2);
  }
}

function calculateInterference() {
  let interference = [];
  for (let x = 0; x < width; x++) {
    let sumWaves = 0;
    for (let particle of particles) {
      let distance = dist(x, detectorTop, particle.x, particle.y);
      sumWaves += sin(distance / waveResolution - frameCount / 10);
    }
    interference.push(sumWaves);
  }

  for (let x = 0; x < width; x++) {
    let colorValue = map(interference[x], -particles.length, particles.length, 0, 255);
    stroke(colorValue);
    line(x, height - detectorWidth, x, height);
  }
}
