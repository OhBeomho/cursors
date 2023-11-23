const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let mouseX = window.innerWidth / 2,
  mouseY = window.innerHeight / 2;

class Clock {
  constructor() {
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    this.numbers = [];
    const now = new Date();
    this.hands = [
      {
        v: now.getHours(),
        p: ((1 - 1 / 12) * (now.getHours() + 6) + (1 - 1 / 12 / 60) * now.getMinutes()) * 2 * Math.PI
      },
      {
        v: now.getMinutes(),
        p: (1 - 1 / 60) * (now.getMinutes() + 30) * 2 * Math.PI
      },
      {
        v: now.getSeconds(),
        p: (1 - 1 / 60) * (now.getSeconds() + 30) * 2 * Math.PI
      }
    ];

    for (let i = 1; i <= 12; i++) {
      this.numbers.push({
        number: i,
        p: (1 - 1 / 12) * 2 * (i + 6) * Math.PI,
        bx: this.x,
        by: this.y,
        t: 0
      });
    }

    for (let i = 0; i < 3; i++) {
      this.hands[i].bx = this.x;
      this.hands[i].by = this.x;
    }

    this.updateTime = this.updateTime.bind(this);
    setInterval(this.updateTime, 500);
  }

  updateTime() {
    const now = new Date();

    if (now.getSeconds() !== this.hands[2].v) {
      this.hands[2].v = now.getSeconds();
      this.hands[2].p = (1 - 1 / 60) * (now.getSeconds() + 30) * 2 * Math.PI;

      if (now.getMinutes() !== this.hands[1].v) {
        this.hands[1].v = now.getMinutes();
        this.hands[1].p = (1 - 1 / 60) * (now.getMinutes() + 30) * 2 * Math.PI;

        if (now.getHours() !== this.hands[0].v) {
          this.hands[0].v = now.getHours();
          this.hands[0].p = ((1 - 1 / 12) * (now.getHours() + 6) + (1 - 1 / 12 / 60) * now.getMinutes()) * 2 * Math.PI;
        }
      }
    }
  }

  update() {
    for (let i = 0; i < 12; i++) {
      const tx = mouseX,
        ty = mouseY,
        idx = i;
      setTimeout(() => {
        const { bx, by } = this.numbers[idx];
        this.numbers[idx].bx += (tx - bx) / 8;
        this.numbers[idx].by += (ty - by) / 8;
      }, 100 + 50 * i);
    }

    for (let i = 0; i < 3; i++) {
      const tx = mouseX,
        ty = mouseY,
        idx = i;
      setTimeout(() => {
        const { bx, by } = this.hands[idx];
        this.hands[idx].bx += (tx - bx) / 8;
        this.hands[idx].by += (ty - by) / 8;
      }, 250 + 50 * i);
    }
  }

  draw() {
    for (let i = 0; i < 12; i++) {
      const { number, bx, by, p } = this.numbers[i];

      ctx.font = "bold 20px monospace";
      ctx.textAlign = "center";
      ctx.fillText(number, bx + Math.sin(p) * 100, by + Math.cos(p) * 100 + 5);
    }

    for (let i = 0; i < 3; i++) {
      const { p, bx, by } = this.hands[i];

      ctx.lineWidth = 3 - 1 * i;
      ctx.strokeStyle = "black";

      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.sin(p) * (70 + 4 * (i * 2)), by + Math.cos(p) * (70 + 4 * (i * 2)));
      ctx.stroke();
    }
  }
}

const clock = new Clock();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  clock.update();
  clock.draw();

  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
  mouseX = x;
  mouseY = y;
});

resizeCanvas();
animate();
