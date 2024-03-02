const words = [
    "apple", "banana", "table", "chair", "knife", "spoon", "glass", "plate",
    "phone", "mouse", "house", "light", "clock", "heart", "cloud", "horse",
    "plant", "shoe", "dress", "shirt", "pants", "socks", "watch", "radio",
    "brush", "music", "water", "chair", "paper", "pencil", "phone", "tablet",
    "grape", "melon", "lemon", "juice", "bread", "toast", "snack", "candy",
    "dream", "smile", "laugh", "happy", "sleep", "night", "stars", "party"
];
let wordsTop, wordsWidth, wordsHeight, offsets, overlay, newSpan, input, root, inputLen, currentWord, keyCode;
let incorrectCounter = 0;
let correctCounter = 0;
let counter = 0;
let removeIndex = 0;

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

  input = document.getElementById("input");
  input.value = null;
  currentWord = document.getElementById("word-" + removeIndex).textContent;
  input.addEventListener("keydown", keyInput);

});

const removeSpan = () => document.getElementById("word-" + removeIndex).remove();

const displayOverlay = (value) => value == true ? overlay.classList.replace("hidden", "visible") : overlay.classList.replace("visible", "hidden");

function changeOverlay() {
  wordsTop = offsets.top;
  wordsWidth = offsets.width;
  wordsHeight = offsets.height;

  overlay.style.width = wordsWidth + "px";
  overlay.style.height = wordsHeight + "px";
  overlay.style.top = wordsTop + "px";
}

function updateWPM() {
  const currentTime = new Date().getTime();
  const elapsedMilliseconds = currentTime - startTime;
  const elapsedSeconds = elapsedMilliseconds / 1000;
  const typedAmount = parseInt(removeIndex + 1);
  const wpm = Math.round((typedAmount / elapsedSeconds) * 60);
  const wpmElement = document.getElementById("wp");
  wpmElement.textContent = wpm;
}


function keyDownEvent(e) {

  keyCode = `${e.code}`;

  if (incorrectCounter === 0 && correctCounter == 0) {
    startTime = new Date().getTime(); // Start timer
  }

  if (keyCode === "Backspace" && input.value === " ") {
    e.preventDefault(); // Prevent the user from backspacing when the input is empty (input defaulted to " ")
  }



  inputLen = input.value.length;
  console.log(inputLen);
  if (currentWord[inputLen-1] == keyCode){

    updateAccuracy();
    updateWPM();

  }

  if (keyCode === "Space" && inputLen >= currentWord.length) {
    currentWord = document.getElementById("word-" + removeIndex).textContent;
    removeSpan(); // Remove word that has been typed
    removeIndex++;
    input.value = "";

  }

  if (removeIndex === words.length) {
    // After all words are typed
    input.disabled = true;
  }
}

function updateAccuracy() {
  const accuracy = document.getElementById("ac");
  if (incorrectCounter === 0) {
    // Preserve accuracy at 100% if no incorrect words
    accuracy.textContent = "100";
  } else if (correctCounter === 0) {
    // Preserve accuracy at 0% if no correct words
    accuracy.textContent = "0";
  } else {
    const accuracyValue = Math.round(
      (correctCounter / (correctCounter + incorrectCounter)) * 100
    );
    accuracy.textContent = accuracyValue;
  }
}


const regex = /^[A-Za-z]$/;
let letterCount = 0;
let keyData;
const allowedKeys = ["Backspace", " "];

function keyInput(e){

    keyData = `${e.key}`;
    console.log("Word len: ", currentWord.length)
    if (!allowedKeys.includes(keyData) && !regex.test(keyData) || (keyCode === "Backspace" && input.value === " ")){
        e.preventDefault();
        return;
    } else if(keyData == " " && letterCount < currentWord.length){
        e.preventDefault();
        return;
    }
    
    if (regex.test(keyData)){
        letterCount++;
    } else if (keyData == "Backspace" && letterCount > 0){
        letterCount--;
    } 
    console.log("Input len: " ,letterCount);
    if (keyData == " " && letterCount >= currentWord.length){

        currentWord = document.getElementById("word-" + removeIndex).textContent;
        removeSpan(); // Remove word that has been typed
        removeIndex++;
        input.value = "";
        letterCount = 0;

    }

}
