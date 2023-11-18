const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const posArr = [];
const cursorSize = 30;

let mouseX = 0,
  mouseY = 0;

ctx.strokeStyle = "black";
ctx.fillStyle = "black";

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const d = cursorSize / posArr.length;
  ctx.lineWidth = d;
  for (let i = 0; i < posArr.length - 1; i++) {
    const pos = posArr[i];
    const nextPos = posArr[i + 1];

    ctx.lineWidth += d;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(nextPos.x, nextPos.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(nextPos.x, nextPos.y, ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(mouseX, mouseY, cursorSize / 2, 0, 2 * Math.PI);
  ctx.fill();

  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
requestAnimationFrame(animate);

window.addEventListener("mousemove", (e) => {
  const { clientX: x, clientY: y } = e;
  posArr.push({ x, y });
  setTimeout(() => posArr.splice(0, 1), posArr.length < 20 ? 150 - 5 * posArr.length : 50);
  mouseX = x;
  mouseY = y;
});
window.addEventListener("resize", resizeCanvas);
