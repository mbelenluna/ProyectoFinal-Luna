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

class Service{
    constructor(source, target, rate) {
        this.source = source
        this.target = target
        this.rate = rate
    }
}

const engspa = new Service("english", "spanish", 0.10);
const spaeng = new Service("spanish", "english", 0.12);
const engtch = new Service("english", "traditional chinese", 0.13);
const tcheng = new Service("traditional chinese", "english", 0.15);
const engsch = new Service("english", "simplified chinese", 0.13);
const scheng = new Service("simplified chinese", "english", 0.15);
const engkor = new Service("english", "korean", 0.13);
const koreng = new Service("korean", "english", 0.15);
const engfreu = new Service("english", "french", 0.13);
const freueng = new Service("french", "english", 0.15);
const enghin = new Service("english", "hindi", 0.13);
const hineng = new Service("hindi", "english", 0.15);
const engtag = new Service("english", "tagalog", 0.13);
const tageng = new Service("tagalog", "english", 0.15);
const engarc = new Service("english", "arabic", 0.13);
const arceng = new Service("arabic", "english", 0.15);
const engita = new Service("english", "italian", 0.14);
const itaeng = new Service("italian", "english", 0.16);
const engarm = new Service("english", "armenian", 0.14);
const armeng = new Service("armenian", "english", 0.16);
const engcam = new Service("english", "cambodian", 0.14);
const cameng = new Service("cambodian", "english", 0.16);
const engfar = new Service("english", "farsi", 0.14);
const fareng = new Service("farsi", "english", 0.16);
const engpol = new Service("english", "polish", 0.14);
const poleng = new Service("polish", "english", 0.16);
const engrus = new Service("english", "russian", 0.14);
const ruseng = new Service("russian", "english", 0.16);
const engjpn = new Service("english", "japanese", 0.15);
const jpneng = new Service("japanese", "english", 0.17);
const engbur = new Service("english", "burmese", 0.15);
const bureng = new Service("burmese", "english", 0.17);
const engind = new Service("english", "indonesian", 0.15);
const indeng = new Service("indonesian", "english", 0.17);
const engger = new Service("english", "german", 0.15);
const gereng = new Service("german", "english", 0.17);
const engpas = new Service("english", "pashto", 0.15);
const paseng = new Service("pashto", "english", 0.17);
const engafr = new Service("english", "afrikaans", 0.15);
const afreng = new Service("afrikaans", "english", 0.17);
const engamh = new Service("english", "amharic", 0.15);
const amheng = new Service("amharic", "english", 0.17);
const engcro = new Service("english", "croatian", 0.16);
const croeng = new Service("croatian", "english", 0.18);
const engdar = new Service("english", "dari", 0.16);
const dareng = new Service("dari", "english", 0.18);
const engdut = new Service("english", "dutch", 0.16);
const duteng = new Service("dutch", "english", 0.18);
const engswe = new Service("english", "swedish", 0.16);
const sweeng = new Service("swedish", "english", 0.18);
const enghmo = new Service("english", "hmong", 0.16);
const hmoeng = new Service("hmong", "english", 0.18);

const services = [];

services.push(engspa, spaeng, engtch, tcheng, engsch, scheng, engkor, koreng, engfreu, freueng, enghin, hineng, engtag, tageng, engarc, arceng, engita, itaeng, engarm, armeng, engcam, cameng, engfar, fareng, engpol, poleng, engrus, ruseng, engjpn, jpneng, engbur, bureng, engind, indeng, engger, gereng, engpas, paseng, engafr, afreng, engamh, amheng, engcro, croeng, engdar, dareng, engdut, duteng, engswe, sweeng, enghmo, hmoeng)

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

let proceed = prompt("Would you like to proceed with this request?");
let clientEmail;

if (proceed === "yes" || proceed === "YES" || proceed === "Yes") {
    clientEmail = prompt("Please insert your email address. One of our agents will get in touch with you soon to confirm the quote.");
} 