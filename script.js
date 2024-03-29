const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const size = document.querySelector('.size');
const color = document.querySelector('.color');
const fill =  document.querySelector('.fill');
const rubber =  document.querySelector('.rubber');
const dot =  document.querySelector('.dot');
const save =  document.querySelector('.save');



const dataURL = localStorage.getItem(canvas);
const img = new Image();
img.src = dataURL;
img.onload = () => {
  ctx.drawImage(img, 0, 0)
}

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

const dotMove = e => {
    console.log(dot);
    const left = e.clientX;
    const top = e.clientY;
    dot.style.left = `${left}px`
    dot.style.top = `${top}px`
    dot.style.width = `${size.value}px`;
     dot.style.height= `${size.value}px`;
}

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
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => {
  isDrawing = false
  //autosave
  localStorage.setItem(canvas, canvas.toDataURL());
});
canvas.addEventListener('mouseout', () => isDrawing = false);

fill.addEventListener('click', () => {
  ctx.fillStyle = color.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

rubber.addEventListener('click', () => {
  isRubberMode = !isRubberMode;
  isRubberMode? rubber.textContent = 'Put rubber down' : rubber.textContent = 'Use the rubber' ;
});

save.addEventListener('click', () => localStorage.setItem(canvas, canvas.toDataURL()));

document.addEventListener('mousemove', dotMove);


