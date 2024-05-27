let canvas;
let particles = [];
let numParticles = 15;
let lightWave;
let scatteringWaves = [];
let sizeSlider;
let intensityHistory = [];
let maxHistoryLength = 60 * 10; // Assuming 60 frames per second, this covers 5 seconds
let scatterDelay = 300; // Delay in milliseconds

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent("light-scatter-container");
  sizeSlider = createSlider(5, 20, 10);
  sizeSlider.position(canvas.position().x, canvas.position().y);
  initializeParticles(sizeSlider.value());
  lightWave = new LightWave();
}

function draw() {
  background(255);
  let newSize = sizeSlider.value();
  if (particles.length > 0 && particles[0].r !== newSize) {
    updateParticleSizes(newSize);
    scatteringWaves = []; // Clear all scattering waves when particle size changes
  }

  for (let particle of particles) {
    particle.update();
    particle.display();
    let scattered = lightWave.isScattering(particle);
    if (scattered && millis() - particle.lastScatterTime > scatterDelay) {
      let intensity = calculateIntensity(scattered.angle, particle.r);
      scatteringWaves.push(new ScatteringWave(scattered.hitX, scattered.hitY, intensity));
      particle.lastScatterTime = millis(); // Update last scatter time
    }
  }

  lightWave.update();
  lightWave.display();

  for (let wave of scatteringWaves) {
    wave.update();
    wave.display();
    if (wave.radius >= height) {
      intensityHistory.push({ time: millis(), intensity: wave.intensity });
      wave.startFadeOut();
    }
  }

  // Remove fully faded-out waves
  scatteringWaves = scatteringWaves.filter(wave => wave.alpha > 0);

  // Remove old intensity data (older than 5 seconds)
  let simCurrentTime = millis();
  intensityHistory = intensityHistory.filter(data => simCurrentTime - data.time <= 5000);
}

function initializeParticles(size) {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height), size));
  }
}

function updateParticleSizes(newSize) {
  for (let particle of particles) {
    particle.updateSize(newSize);
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
    this.lastScatterTime = 0; // Initialize last scatter time
  }

  updateSize(newSize) {
    this.r = newSize;
    this.speedFactor = 80 / newSize;
    this.vx = (this.vx / abs(this.vx)) * random(0.2, 0.2) * this.speedFactor;
    this.vy = (this.vy / abs(this.vy)) * random(0.2, 0.2) * this.speedFactor;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
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
    this.amplitude = 25;
    this.wavelength = 150; // Adjusted for better visualization
    this.speed = 1; // Slowing down the wave
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
  constructor(x, y, intensity) {
    this.x = x;
    this.y = y;
    this.intensity = intensity;
    this.radius = 5;
    this.speed = 5; // Speed of the scattering wave
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
    stroke(0, 255, 0, this.alpha); // Green scattering waves with more transparency
    noFill();
    ellipse(this.x, this.y, this.radius * 2);
  }
}

function calculateIntensity(angle, diameter) {
  let intensity = (1 + cos(angle)) * (diameter / 15);
  return map(intensity, 0, 2, 50, 255); // Adjusting the intensity range for visualization
}
