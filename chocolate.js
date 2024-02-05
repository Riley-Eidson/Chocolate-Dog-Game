import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./updateCustomProperty.js";

const SPEED = 0.05;
const CHOCOLATE_INTERVAL_MIN = 500;
const CHOCOLATE_INTERVAL_MAX = 2000;
const worldElem = document.querySelector("[data-world]");

let nextChocolateTime;

export function setupChocolate() {
  nextChocolateTime = CHOCOLATE_INTERVAL_MIN;
  document.querySelectorAll("[data-chocolate]").forEach(chocolate => {
    chocolate.remove();
  });
}

export function updateChocolate(delta, speedScale) {
  document.querySelectorAll("[data-chocolate]").forEach(chocolate => {
    incrementCustomProperty(chocolate, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(chocolate, "--left") <= -100) {
      chocolate.remove();
    }
  });

  if (nextChocolateTime <= 0) {
    createChocolate();
    nextChocolateTime =
      randomNumberBetween(CHOCOLATE_INTERVAL_MIN, CHOCOLATE_INTERVAL_MAX) / speedScale;
  }
  nextChocolateTime -= delta;
}

export function getChocolateRects() {
  return [...document.querySelectorAll("[data-chocolate]")].map(chocolate => {
    const rect = chocolate.getBoundingClientRect();
    
    const smallerRect = {
      top: rect.top + 10,    
      right: rect.right - 30,  
      bottom: rect.bottom - 10, 
      left: rect.left + 30,    
      width: rect.width - 100,  
      height: rect.height - 20  
    };

    return smallerRect;
  });
}

function createChocolate() {
  const chocolate = document.createElement("img");
  chocolate.dataset.chocolate = true;
  chocolate.src = "images/chocolate.png";
  chocolate.classList.add("chocolate");
  setCustomProperty(chocolate, "--left", 100);
  worldElem.append(chocolate);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
