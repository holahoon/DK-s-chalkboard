// Grab canvas
const canvas = document.querySelector("#board");
// return an object that provides methods and properties for drawing on the canvas: where the drawing takes place
const ctx = canvas.getContext("2d");

// Resize the canvas before any drawing takes place
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = "#ffffff"; // initial stroke color
ctx.lineJoin = "round"; // creates a rounded corner when two lines meet
ctx.lineCap = "round"; // draws a line with rounded end caps
ctx.lineWidth = 2; // initial thickness of the drawing line

// flag - 'click-down'=true || 'click-up'=false
let isDrawing = false;
// flag - 'menu button'
let isButtonClicked = false;
// Initialize X, Y
let lastX = 0;
let lastY = 0;

function draw(event) {
  if (!isDrawing) return; // if isDrawing = false, exit out of the function
  console.log(event);
  ctx.beginPath(); // begins a path or resets the current path
  // Start drawing -
  ctx.moveTo(lastX, lastY); // moves the path to the given point in the canvas without creating a line
  // Go to -
  ctx.lineTo(event.offsetX, event.offsetY); // adds a new point and creates a line to that point from the last given point in the canvas. will not draw a line
  // Draw -
  ctx.stroke(); // draws the path defined with all of moveTo() and lineTo() methods

  //   lastX = event.offsetX;
  //   lastY = event.offsetY;
  [lastX, lastY] = [event.offsetX, event.offsetY]; // ES6 destructuring an array

  // hide the popped up menus upon drawing
  size_range.style.display = "none";
  color_range.style.display = "none";
}
canvas.addEventListener("mousedown", e => {
  isDrawing = true;
  // wherever the mouse is clicked, lastX, lastY variables will store that offsetX, offsetY position to begin a new drawing
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

/* --- BUTTONS --- */

const erase = document.querySelector("#erase");
const color = document.querySelector("#color");
const size = document.querySelector("#size");
const chalk = document.querySelector("#chalk");
const reset = document.querySelector("#reset");

const size_range = document.querySelector("#size-range");
const eraser_range = document.querySelector("#eraser-range");
const color_range = document.querySelector("#color-range");

// Open menu when button clicked ---

function startDrawing() {
  ctx.strokeStyle = color_range.value;
  ctx.lineWidth = size_range.value;
}
function startErasing() {
  ctx.strokeStyle = "#084718";
  ctx.lineWidth = size_range.value;
}
function showSize() {
  if (!isButtonClicked) {
    size_range.style.display = "inline";
    isButtonClicked = true;
  } else {
    size_range.style.display = "none";
    isButtonClicked = false;
  }
}
function showColor() {
  color_range.value = "#ffffff";
  if (!isButtonClicked) {
    color_range.style.display = "inline";
    isButtonClicked = true;
  } else {
    color_range.style.display = "none";
    isButtonClicked = false;
  }
}
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function adjustSize() {
  ctx.lineWidth = this.value; // 'this' refers to size_range
}
function changeColor() {
  ctx.strokeStyle = this.value;
  color.style.color = `${this.value}`;
}

chalk.addEventListener("click", startDrawing);
eraser.addEventListener("click", startErasing);
size.addEventListener("click", showSize);
color.addEventListener("click", showColor);
reset.addEventListener("click", resetCanvas);

size_range.addEventListener("change", adjustSize);
size_range.addEventListener("mousemove", adjustSize);

color_range.addEventListener("change", changeColor);
