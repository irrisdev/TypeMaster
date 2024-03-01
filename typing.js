const words = ["bee","imprison","sky","current","ship","oven","sort","eat","marvelous","rub","shiny","grubby","chilly","dynamic","fizz","journey","boil","slip","uncovered","manage","sweep","chip","sash","drill","note"];


document.addEventListener("DOMContentLoaded", () => {
    
    const input = document.getElementById("input");
    const text = document.getElementById("word");
    
    input.addEventListener("input", () => {
    
        text.textContent = input.value;
    
    })

    const root = document.getElementById("words-container");
    let newSpan;

    for(let word of words){

        newSpan = document.createElement("span");
        newSpan.textContent = word;
        root.append(newSpan);

    }

    
});


