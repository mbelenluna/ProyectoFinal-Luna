//Creo función para calcular el monto final

function calculatePrice() {
    return totalWordcount * rate;
}

//Variables

let wordcount;
let addFiles = true;
let rate = 0;
let totalAmount = 0;
let totalWordcount = 0;
const fileNames = [];

while (addFiles === true) { 
    wordcount = parseInt(prompt("Please insert the word count of your file."));
    fileNames.push(prompt("Insert the name of your file."));
    totalWordcount = totalWordcount + wordcount;
    addMoreFiles = prompt("Would you like to add more files?");
    
    if (addMoreFiles === "yes") {
        addFiles = true;
    } else if (addMoreFiles === "no") {
        addFiles = false;
    } 
}

let sourceLanguage = prompt("Please insert the source language.");
let targetLanguage = prompt("Which language do you need your document translated into?");
let turnaround = prompt("How soon do you need it?");

//Tasa por palabra 

const services = [
	{
		source: "english",
		target: "spanish",
		rate: 0.10
	},
	{
		source: "spanish",
		target: "english",
		rate: 0.12
	},
	{
		source: "english",
		target: "simplified chinese",
		rate: 0.13
	},
	{
		source: "simplified chinese",
		target: "english",
		rate: 0.15
	},
	{
		source: "english",
		target: "traditional chinese",
		rate: 0.13
	},
	{
		source: "traditional chinese",
		target: "english",
		rate: 0.15
	}
];

for (const service of services) {
	if (service.source === sourceLanguage && service.target === targetLanguage) {
		rate = service.rate;
	}
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
console.log("Translation from " + sourceLanguage + " into " + targetLanguage + "\nWordcount: " + totalWordcount + "\nFile names: " + fileNames.join(", ") + "\nTurnaround: " + turnaround);