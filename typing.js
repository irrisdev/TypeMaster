
const url = "https://random-word-api.herokuapp.com/word?number=30&length=5";
const test = () => fetch(url).then(response => response.json()).catch(error => console.error('Error:', error));

document.addEventListener("DOMContentLoaded", async () => {

    const words = await test();

    const root = document.getElementById("words-container");
    let newSpan, counter = 0;

    for(let word of words){
        newSpan = document.createElement("span");
        newSpan.id = 'w' + counter;
        newSpan.textContent = word;
        root.append(newSpan);
        counter++;


    }
    let removeCounter = 0;
    const removeSpan = () => {
        document.getElementById("w" + removeCounter).remove();
    }
    const input = document.getElementById("input");
    input.addEventListener("keydown", (e) => {
        if(`${e.code}` == "Space"){
            input.value = "";
        };
    })

});


