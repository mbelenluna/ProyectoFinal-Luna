//Creo función para calcular el monto final y loopear los idiomas objetivo

function calculatePrice() {
    return totalWordcount * calculateRate();
}

function calculateRate() {
    for (let i = 0; i < services.length; i++) {
        let sourceMatch = services[i].source;
        let targetMatch = services[i].target;
        let rateMatch = services[i].rate;
        if ((sourceLanguageSelected === sourceMatch) && (targetLanguageSelected === targetMatch)) {
        return rateMatch;
        }
    }
}

//Variables

let wordcount;
let sourceLanguageSelected;
let targetLanguageSelected;
let turnaround;
let addFiles = true;
let rate = 0;
let totalAmount = 0;
let totalWordcount = 0;
const fileNames = [];
const sourceLanguageList = document.getElementsByClassName("source-language");
let targetLanguages = document.getElementsByClassName("target-language");


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
const engport = new Service("english", "portuguese", 0.11);
const porteng = new Service("portuguese", "english", 0.13);
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
const engviet = new Service("english", "vietnamese", 0.14);
const vieteng = new Service("vietnamese", "english", 0.16);
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
const engafr = new Service("english", "afrikaans", 0.15, "eng-s", "afr-t");
const afreng = new Service("afrikaans", "english", 0.17, "afr-s", "eng-t");
const engamh = new Service("english", "amharic", 0.15);
const amheng = new Service("amharic", "english", 0.17);
const engcro = new Service("english", "croatian", 0.16);
const croeng = new Service("croatian", "english", 0.18);
const engdar = new Service("english", "dari", 0.16);
const dareng = new Service("dari", "english", 0.18);
const engdut = new Service("english", "dutch", 0.16);
const duteng = new Service("dutch", "english", 0.18);

const services = [];

services.push(engafr, afreng, engamh, amheng, engarc, arceng, engarm, armeng, engind, indeng, engbur, bureng, engcam, cameng, engsch, scheng, engtch, tcheng, engcro, croeng, engdar, dareng, engdut, duteng, engdar, dareng, engdut, duteng, engfar, fareng, engfreu, freueng, engger, gereng, enghin, hineng, engita, itaeng, engjpn, jpneng, engkor, koreng, engpas, paseng, engpol, poleng, engport, porteng, engrus, ruseng, engspa, spaeng, engtag, tageng, engviet, vieteng);

//DOM
//Source languages
let afrS = document.getElementById("afr-s");
let amhS = document.getElementById("amh-s");
let arcS = document.getElementById("arc-s");
let armS = document.getElementById("arm-s");
let indS = document.getElementById("ind-s");
let burS = document.getElementById("bur-s");
let camS = document.getElementById("cam-s");
let schS = document.getElementById("sch-s");
let tchS = document.getElementById("tch-s");
let croS = document.getElementById("cro-s");
let darS = document.getElementById("dar-s");
let dutS = document.getElementById("dut-s");
let engS = document.getElementById("eng-s");
let farS = document.getElementById("far-s");
let freuS = document.getElementById("freu-s");
let gerS = document.getElementById("ger-s");
let hinS = document.getElementById("hin-s");
let itaS = document.getElementById("ita-s");
let jpnS = document.getElementById("jpn-s");
let korS = document.getElementById("kor-s");
let pasS = document.getElementById("pas-s");
let polS = document.getElementById("pol-s");
let portS = document.getElementById("port-s");
let rusS = document.getElementById("rus-s");
let spaS = document.getElementById("spa-s");
let tagS = document.getElementById("tag-s");
let vietS = document.getElementById("viet-s");

//Target languages

let afrT = document.getElementById("afr-t");
let amhT = document.getElementById("amh-t");
let arcT = document.getElementById("arc-t");
let armT = document.getElementById("arm-t");
let indT = document.getElementById("ind-t");
let burT = document.getElementById("bur-t");
let camT = document.getElementById("cam-t");
let schT = document.getElementById("sch-t");
let tchT = document.getElementById("tch-t");
let croT = document.getElementById("cro-t");
let darT = document.getElementById("dar-t");
let dutT = document.getElementById("dut-t");
let engT = document.getElementById("eng-t");
let farT = document.getElementById("far-t");
let freuT = document.getElementById("freu-t");
let gerT = document.getElementById("ger-t");
let hinT = document.getElementById("hin-t");
let itaT = document.getElementById("ita-t");
let jpnT = document.getElementById("jpn-t");
let korT = document.getElementById("kor-t");
let pasT = document.getElementById("pas-t");
let polT = document.getElementById("pol-t");
let portT = document.getElementById("port-t");
let rusT = document.getElementById("rus-t");
let spaT = document.getElementById("spa-t");
let tagT = document.getElementById("tag-t");
let vietT = document.getElementById("viet-t");

//EVENTOS PARA SOURCE LANGUAGE 

afrS.onclick = () => {
    sourceLanguageSelected = "afrikaans";
    afrS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
amhS.onclick = () => {
    sourceLanguageSelected = "amharic";
    amhS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
arcS.onclick = () => {
    sourceLanguageSelected = "arabic";
    arcS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
armS.onclick = () => {
    sourceLanguageSelected = "armenian";
    armS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
indS.onclick = () => {
    sourceLanguageSelected = "indonesian";
    indS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
burS.onclick = () => {
    sourceLanguageSelected = "burmese";
    burS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
camS.onclick = () => {
    sourceLanguageSelected = "cambodian";
    camS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
schS.onclick = () => {
    sourceLanguageSelected = "simplified chinese";
    schS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
tchS.onclick = () => {
    sourceLanguageSelected = "traditional chinese";
    tchS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
croS.onclick = () => {
    sourceLanguageSelected = "croatian";
    croS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
darS.onclick = () => {
    sourceLanguageSelected = "dari";
    darS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
dutS.onclick = () => {
    sourceLanguageSelected = "dutch";
    dutS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
engS.onclick = () => {
    sourceLanguageSelected = "english";
    engS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
farS.onclick = () => {
    sourceLanguageSelected = "farsi";
    farS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
freuS.onclick = () => {
    sourceLanguageSelected = "french";
    freuS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
gerS.onclick = () => {
    sourceLanguageSelected = "german";
    gerS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
hinS.onclick = () => {
    sourceLanguageSelected = "hindi";
    hinS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
itaS.onclick = () => {
    sourceLanguageSelected = "italian";
    itaS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
jpnS.onclick = () => {
    sourceLanguageSelected = "japanese";
    jpnS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
korS.onclick = () => {
    sourceLanguageSelected = "korean";
    korS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
pasS.onclick = () => {
    sourceLanguageSelected = "pashto";
    pasS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
polS.onclick = () => {
    sourceLanguageSelected = "polish";
    polS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
portS.onclick = () => {
    sourceLanguageSelected = "portuguese";
    portS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
rusS.onclick = () => {
    sourceLanguageSelected = "russian";
    rusS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
spaS.onclick = () => {
    sourceLanguageSelected = "spanish";
    spaS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
tagS.onclick = () => {
    sourceLanguageSelected = "tagalog";
    tagS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}
vietS.onclick = () => {
    sourceLanguageSelected = "vietnamese";
    vietS.style.backgroundColor = "white";
    console.log(sourceLanguageSelected);
}

//EVENTOS PARA TARGET LANGUAGE

afrT.onclick = () => {
    targetLanguageSelected = "afrikaans";
    afrT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}
amhT.onclick = () => {
    targetLanguageSelected = "amharic";
    amhT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}
arcT.onclick = () => {
    targetLanguageSelected = "arabic";
    arcT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}
armT.onclick = () => {
    targetLanguageSelected = "armenian";
    armT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}
indT.onclick = () => {
    targetLanguageSelected = "indonesian";
    indT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
burT.onclick = () => {
    targetLanguageSelected = "burmese";
    burT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
camT.onclick = () => {
    targetLanguageSelected = "cambodian";
    camT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
schT.onclick = () => {
    targetLanguageSelected = "simplified chinese";
    schT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
tchT.onclick = () => {
    targetLanguageSelected = "traditional chinese";
    tchT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
croT.onclick = () => {
    targetLanguageSelected = "croatian";
    croT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
darT.onclick = () => {
    targetLanguageSelected = "dari";
    darT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
dutT.onclick = () => {
    targetLanguageSelected = "dutch";
    dutT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
engT.onclick = () => {
    targetLanguageSelected = "english";
    engT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
farT.onclick = () => {
    targetLanguageSelected = "farsi";
    farT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
freuT.onclick = () => {
    targetLanguageSelected = "french";
    freuT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
gerT.onclick = () => {
    targetLanguageSelected = "german";
    gerT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
hinT.onclick = () => {
    targetLanguageSelected = "hindi";
    hinT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
itaT.onclick = () => {
    targetLanguageSelected = "italian";
    itaT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
jpnT.onclick = () => {
    targetLanguageSelected = "japanese";
    jpnT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
korT.onclick = () => {
    targetLanguageSelected = "korean";
    korT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
pasT.onclick = () => {
    targetLanguageSelected = "pashto";
    pasT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
polT.onclick = () => {
    targetLanguageSelected = "polish";
    polT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
portT.onclick = () => {
    targetLanguageSelected = "portuguese";
    portT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
rusT.onclick = () => {
    targetLanguageSelected = "russian";
    rusT.style.backgroundColor = "white";
    console.log(targetLanguageSelected)
}
spaT.onclick = () => {
    targetLanguageSelected = "spanish";
    spaT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}
tagT.onclick = () => {
    targetLanguageSelected = "tagalog";
    tagT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}
vietT.onclick = () => {
    targetLanguageSelected = "vietnamese";
    vietT.style.backgroundColor = "white";
    console.log(targetLanguageSelected);
}


//DOM turnaround

let asap = document.getElementById("asap");
let notrush = document.getElementById("notrush");

asap.onclick = () => {
    asap.style.backgroundColor = "white";
    turnaround = "As soon as possible";
    console.log(turnaround);
}

notrush.onclick = () => {
    notrush.style.backgroundColor = "white";
    turnaround = "Standard turnaround";
    console.log(turnaround);
}



//SUBMIT

submitButton = document.getElementById("submit");
submitButton.onclick = () => {
    rate = calculateRate();
    totalAmount = calculatePrice();

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

    //Redondeo el monto
    
    totalAmount = Math.round(totalAmount);

    alert("The total amount would be $" + totalAmount);
    console.log("Translation from " + sourceLanguageSelected + " into " + targetLanguageSelected + "\nWordcount: " + totalWordcount + "\nFile names: " + fileNames.join(", ") + "\nTurnaround: " + turnaround + "\nThe total amount is $" + totalAmount);

    let proceed = prompt("Would you like to proceed with this request?");
    let clientEmail;

    if (proceed === "yes" || proceed === "YES" || proceed === "Yes") {
    clientEmail = prompt("Please insert your email address. One of our agents will get in touch with you soon to confirm the quote.");
} 
}












//Uso de Find y Filter 

const searchResult = services.find((language) => language.target === "polish");
console.log("We offer the following service that matches your search: " + searchResult.source + " into " + searchResult.target + ": " + searchResult.rate);

const filterResult = services.filter((language) => language.target === "english");
console.log(filterResult); 