const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const size = document.querySelector('.size');
const color = document.querySelector('.color');
const fill =  document.querySelector('.fill');
const rubber =  document.querySelector('.rubber');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
let isRubberMode = false;

function draw(e) {
  if (!isDrawing) return;

  if (isRubberMode) {
    ctx.strokeStyle = 'white'; // Colore bianco per la gomma
  } else {
    ctx.strokeStyle = color.value; // Aggiorna il colore
  }

  ctx.lineWidth = size.value;     // Aggiorna la dimensione

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if(direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

fill.addEventListener('click', () => {
  ctx.fillStyle = color.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

rubber.addEventListener('click', () => {
  isRubberMode = !isRubberMode;
});
