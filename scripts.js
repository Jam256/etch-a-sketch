const container = document.getElementById("container");
const screenSizeInput = document.getElementById("screen-size");
const resolutionInput = document.getElementById("resolution");
const regularMode = document.getElementById("regular-mode");
const lightMode = document.getElementById("light-mode");
const colorMode = document.getElementById("color-mode");

let screenSize = 800;
let resolution = 40;
let mode = "regular";

screenSizeInput.value = screenSize;
resolutionInput.value = resolution;

screenSizeInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    resetGrid();
  }
});

resolutionInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    resetGrid();
  }
});

regularMode.addEventListener("click", () => {
  mode = "regular";
  resetGrid();
});

lightMode.addEventListener("click", () => {
  mode = "light";
  resetGrid();
});

colorMode.addEventListener("click", () => {
  mode = "color";
  resetGrid();
});

function createGrid() {
  let resolutionSquared = resolution * resolution;
  let grid = document.createElement("div");
  grid.id = "grid";
  let i;
  for (i = 0; i < resolutionSquared; i++) {
    let cell = document.createElement("div");
    cell.style.backgroundColor = "#111";
    cell.style.opacity = 0;
    cell.addEventListener("mouseover", () => {
      if (mode === "light") {
        cell.style.opacity = Number(cell.style.opacity) + 0.1;
      } else if (mode === "color") {
        cell.style.opacity = 1;
        cell.style.backgroundColor = randomColor();
      } else {
        cell.style.opacity = 1;
      }
    });
    grid.appendChild(cell);
  }
  grid.style.width = `${screenSize}px`;
  grid.style.height = `${screenSize}px`;
  grid.style.gridTemplateRows = `repeat(${resolution}, auto)`;
  grid.style.gridTemplateColumns = `repeat(${resolution}, auto)`;
  container.appendChild(grid);
}

function randomColor() {
  let red = randInt255();
  let green = randInt255();
  let blue = randInt255();
  let color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

function randInt255() {
  let integer = Math.floor(Math.random() * 255);
  return integer;
}

function setScreenSize() {
  screenSize = screenSizeInput.value;
  screenSize = checkSize(screenSize, 1000, 800);
  screenSizeInput.value = screenSize;
}

function setResolution() {
  resolution = resolutionInput.value;
  resolution = checkSize(resolution, 100, 40);
  resolutionInput.value = resolution;
}

function checkSize(size, limit, fallback) {
  size = Number(size);
  if (!size.isNaN && size > 0 && size <= limit) {
    return size;
  } else {
    return fallback;
  }
}

function resetGrid() {
  let grid = document.getElementById("grid");
  grid.parentNode.removeChild(grid);
  setScreenSize();
  setResolution();
  createGrid();
}

createGrid();
