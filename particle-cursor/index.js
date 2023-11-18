const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.a = 1;
    this.v = Math.random() * 3 + 4;
  }

  update() {
    this.a -= 0.05;
    if (this.a <= 0) particles.splice(particles.indexOf(this), 1);

    this.y += this.v;
  }

  draw() {
    ctx.fillStyle = `rgba(0, 0, 0, ${this.a})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const particles = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let p of particles) {
    p.update();
    p.draw();
  }

  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("mousemove", ({ clientX: x, clientY: y }) => particles.push(new Particle(x, y)));
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animate();
