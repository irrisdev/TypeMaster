
const url = "https://random-word-api.herokuapp.com/word?number=30&length=5";
const test = () => fetch(url).then(response => response.json()).catch(error => console.error('Error:', error));

document.addEventListener("DOMContentLoaded", async () => {

    const words = await test();

    const root = document.getElementById("words-container");
    let newSpan;

    for(let word of words){

        newSpan = document.createElement("span");
        newSpan.textContent = word;
        root.append(newSpan);

    }

});


