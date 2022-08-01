//Creo función para calcular el monto final

function calculatePrice() {
    return wordcount * rate;
}

//Variables

let wordcount = parseInt(prompt("Please insert the word count of your file(s)."));
let sourceLanguage = prompt("Please insert the source language.");
let targetLanguage = prompt("Which language do you need your document translated into?");
let turnaround = prompt("How soon do you need it?");
let rate = 0;
let totalAmount = 0;

//Tasa por palabra según el idioma objetivo

switch(targetLanguage) {
    case "spanish":
    case "portuguese":
        rate = 0.10;
        break;
    case "simplified chinese":
    case "traditional chinese":
    case "korean":
    case "french":
    case "hindi":
    case "tagalog":
        rate = 0.13;
        break;
    case "arabic":
    case "italian":
    case "armenian":
    case "cambodian":
    case "farsi":
    case "polish":
    case "russian":
        rate = 0.14;
        break;
    case "japanese":
    case "burmese":
    case "indonesian":
    case "german":
    case "pashto":
        rate = 0.16;
        break;
    case "afrikaans":
    case "amharic":
    case "croatian":
    case "dari":
    case "dutch":
    case "swedish":
        rate = 0.18;
        break;
    case "hmong":
        rate = 0.20;
        break;
}

//Establezco tarifa mínima

if (calculatePrice() < 50) {
    totalAmount = 50;
} else {
    totalAmount = calculatePrice();
}

//Establezco tarifa de urgencia

if (turnaround == "As soon as possible") {
    totalAmount = totalAmount * 1.30;
} 

//Muestro los resultados por alert/consola

alert("The total amount would be $" + totalAmount);
console.log("Translation from " + sourceLanguage + " into " + targetLanguage + "\nWordcount: " + wordcount + "\nTurnaround: " + turnaround);