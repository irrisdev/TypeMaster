const words = [
    "apple", "banana", "table", "chair", "knife", "spoon", "glass", "plate",
    "phone", "mouse", "house", "light", "clock", "heart", "cloud", "horse",
    "plant", "shoe", "dress", "shirt", "pants", "socks", "watch", "radio",
    "brush", "music", "water", "chair", "paper", "pencil", "phone", "tablet",
    "grape", "melon", "lemon", "juice", "bread", "toast", "snack", "candy",
    "dream", "smile", "laugh", "happy", "sleep", "night", "stars", "party"
];
let wordsTop, wordsWidth, wordsHeight, offsets, overlay, newSpan, input, root;
let counter = 0;
let wordInx = 0;

document.addEventListener("DOMContentLoaded", () => {

  root = document.getElementById("words-container");

  offsets = root.getBoundingClientRect();
  overlay = document.getElementById("overlay");

  changeOverlay();
  window.onresize = changeOverlay;

  for (let word of words) {
    newSpan = document.createElement("span");
    newSpan.id = "word-" + counter; // Assign ID to individual words to help track them easier
    newSpan.textContent = word;
    root.append(newSpan);
    counter++;
  }

  word2type = document.getElementById("word-" + wordInx);
  input = document.getElementById("input");
  input.value = null;
  input.addEventListener("keydown", keyboardEvent);
  

});
const showCurrent = () => document.getElementById("word-" + wordInx).classList.add("current");

const displayOverlay = (value) => {
  changeOverlay();
  value == true ? overlay.classList.replace("hidden", "visible") : overlay.classList.replace("visible", "hidden");
} 

function changeOverlay() {
  wordsTop = offsets.top;
  wordsWidth = offsets.width;
  wordsHeight = offsets.height;

  overlay.style.width = wordsWidth + "px";
  overlay.style.height = wordsHeight + "px";
  overlay.style.top = wordsTop + "px";
}

let wordsTyped = 0;
let timeElapsed = 30;
let wordsPerMin = 0;
let wordAccuracy = 100;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Updates WPM and Accuracy every second
const startTimer = async () => {
  
  while (timeElapsed > 0){

    await sleep(1000);
    timeElapsed--;
    wordsPerMin = Math.round((wordsTyped / ( 30 - timeElapsed)) * 60)
    document.getElementById("tm").textContent = timeElapsed;
    document.getElementById("wp").textContent = wordsPerMin;

    wordAccuracy = Math.round(wordsTyped / wordInx * 100);
    document.getElementById("ac").textContent = wordAccuracy;


  }
  input.disabled = true;
  let textOverlay = document.getElementById("overlay-text");
  textOverlay.remove();
  let reloadButton = document.createElement("button");
  reloadButton.type = "button";
  reloadButton.textContent = "click to restart";
  reloadButton.onclick = () => location.reload() ;
  overlay.append(reloadButton);
  displayOverlay(true);

};


const incrementWord = () => {
  wordInx++;
  word2type = document.getElementById("word-" + wordInx);
  
} 

const regex = /^[A-Za-z]$/;
const allowedKeys = ["Backspace", " "];
let keyValue;
let letters = 0;
let word2type;
let firstWord = true;

function keyboardEvent(e) {

  keyValue = `${e.key}`;
  if ((keyValue == "Backspace" && input.value != " ") || (keyValue == " " && letters > 0) || regex.test(keyValue)) {

    if (firstWord){
      startTimer();
      firstWord = false;
    }

    if (keyValue == " " && letters > 0) {
      
      let valid = input.value.replace(" ", "") == word2type.textContent ? "valid" : "fail";
      word2type.classList.replace("current", valid);
      letters = 0;
      incrementWord();
      showCurrent();
      if (valid == "valid") wordsTyped++;
      input.value = "";

    }

    else if (keyValue == "Backspace" && letters >= 0) {
      letters--;
    }

    else if (regex.test(keyValue)) {
      letters++;
    }

  } 
  else {
    e.preventDefault();
  }

}