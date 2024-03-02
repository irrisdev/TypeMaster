const url = "https://random-word-api.herokuapp.com/word?number=30&length=5";
const test = () => fetch(url).then((response) => response.json()).catch((error) => console.error("Error:", error));

let wordsTop, wordsWidth, wordsHeight, offsets, overlay, newSpan, words, input, root;
let incorrectCounter = 0;
let correctCounter = 0;
let counter = 0;
let removeIndex = 0;

document.addEventListener("DOMContentLoaded", async () => {
  words = await test();
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
  input.addEventListener("keydown", keyDownEvent);

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
  if (incorrectCounter === 0 && correctCounter == 0) {
    startTime = new Date().getTime(); // Start timer
  }

  if (`${e.code}` === "Backspace" && input.value === " ") {
    e.preventDefault(); // Prevent the user from backspacing when the input is empty (input defaulted to " ")
  }

  if (`${e.code}` === "Space") {
    const inputValue = input.value.substr(1, input.value.length - 1);
    const word = document.getElementById("word-" + removeIndex).textContent;

    if (inputValue === word) {
      correctCounter++;
    } else {
      incorrectCounter++;
    }

    removeSpan(); // Remove word that has been typed
    removeIndex++;
    input.value = "";
    updateAccuracy();
    updateWPM();
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
