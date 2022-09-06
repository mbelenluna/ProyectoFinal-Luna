//FUNCIONES

//Para calcular el monto total por cada servicio

function calculatePrice() {
    return totalWordcount * calculateRate();
}

//Para identificar la tarifa por palabra según el par de idiomas seleccionado

const calculateRate = () => {
    for (let i = 0; i < services.length; i++) {
        let sourceMatch = services[i].source;
        let targetMatch = services[i].target;
        let rateMatch = services[i].rate;
        if ((sourceLanguageSelected === sourceMatch) && (targetLanguageSelected === targetMatch)) {
        return rateMatch;
        }
    }
}

//Para que se deseleccionen los demás botones al hacer clic en un botón

const selectAndUnselectSource = () => {
    sourceLanguagesList.forEach((language) => {
        if (language.className === "selected") {
            language.classList.remove("selected");
        } 
        if (language.className ==! "selected") {
            language.className = "unselected";
        }
    });
}

const selectAndUnselectTarget = () => {
    targetLanguagesList.forEach((language) => {
        if (language.className === "selected") {
            language.classList.remove("selected");
        } 
        if (language.className ==! "selected") {
            language.className = "unselected";
        }
    });
}

const selectAndUnselectTurnaround = () => {
    turnaroundList.forEach((time) => {
        if (time.className === "selected") {
            time.classList.remove("selected");
        } 
        if (time.className ==! "selected") {
            time.className = "unselected";
        }
    });
}

//Debug para evitar que el usuario continúe si no seleccionó archivo, par de idiomas, etc.

const avoidErrors = (e) => {
    if (e === undefined) {
        console.log(e);
        modal.style.display = "block";
        return false;
    } else {
        return true;
    }
}

//Para poner mayúscula a la primera letra de un string

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Para comparar el par de idioma elegido con los pares de idiomas anteriormente agregados

let exitLoop = false;

const compareLanguages = () => {
    for (let i = 0; i < selectedSourceLanguages.length; i++) {
        if (capitalizeFirstLetter(sourceLanguageSelected) === selectedSourceLanguages[i]) {
            console.log(selectedSourceLanguages[i]);
            for (let j = 0; j < selectedTargetLanguages.length || exitLoop === true; j++) {
                if (capitalizeFirstLetter(targetLanguageSelected) === selectedTargetLanguages[j]) {
                    console.log(selectedTargetLanguages[j]);
                    exitLoop = true;
                    return true;
                }
            } 
        }
    }
}

//Para agregar un par de idiomas al carrito

let arrayOfWords = [];
let stringOfWords;
let wordcountOfFile;

const input = document.getElementById("myFile");
input.addEventListener('change', function (e) {
    console.log(input.files)
    const reader = new FileReader();
    reader.onload = function () {
        const lines = reader.result.split('\n').map(function (line) {
        return line.split(" ");
    });
    console.log(lines);
    arrayOfWords = lines.toString();
    console.log(arrayOfWords);
    stringOfWords = arrayOfWords.replace(/"/g, "");
    stringOfWords = stringOfWords.replace(/,/g, " ");
    console.log(stringOfWords);
    wordcountOfFile = stringOfWords.split(" ");
    wordCount = wordcountOfFile.length;
    localStorage.setItem("wordcount", wordCount);
    }
    reader.readAsText(input.files[0]);
}, false)

const sendEmail = () => {
    let data = {
        from_name : document.getElementById("name").value,
        email_id : document.getElementById("email").value,
        service_container : container.innerText,
        file : input,
    }
    emailjs.send("service_byiyb7y", "template_r27difz", data).then(function (response) {
        modal.style.display = "block";
        modalBody.innerText = "Thank you for your inquiry! An agent will be in touch with you shortly.";
    })
}

const addToCart = () => {
    let serviceLine = document.createElement("p");

    if (localStorage.getItem("wordcount") != null) {
        wordCount = localStorage.getItem("wordcount");
        wordCount = parseInt(wordCount);
        console.log(wordCount);
    } 

    console.log(wordCount);
    totalWordcount = parseInt(wordCount);
    totalAmount = calculatePrice();
    calculateMinimumFee();
    
    if ((avoidErrors(sourceLanguageSelected)) && (avoidErrors(targetLanguageSelected)) && (avoidErrors(fileName)) && (avoidErrors(totalWordcount))) {

        if (isNaN(totalAmount)) {
            modal.style.display = "block";
            modalBody.innerText = "Unfortunately, we do not offer translation services for the selected language pair at this moment. Please contact us directly through our Contact Us Form to see if we can accomodate your request."
            totalAmount = 0;
            container.appendChild(serviceLine);
        } else if (compareLanguages()) {
            modal.style.display = "block";
            modalBody.innerText = "You have already selected this language pair.";
            totalAmount = 0;
            exitLoop = false;
            container.appendChild(serviceLine);
        } else {

            servicesSelected.push({
                source: sourceLanguageSelected,
                target: targetLanguageSelected,
                amount: totalAmount
            });

            finalTotalAmount += totalAmount;
            console.log(compareLanguages());

            selectedSourceLanguages.push(capitalizeFirstLetter(sourceLanguageSelected));
            selectedTargetLanguages.push(capitalizeFirstLetter(targetLanguageSelected));
            rate = calculateRate();

            console.log(rate);

            finalTotalAmount = Math.round(finalTotalAmount);
            console.log(finalTotalAmount);

            Toastify({

                text: "You selected " + capitalizeFirstLetter(sourceLanguageSelected) + " into " + capitalizeFirstLetter(targetLanguageSelected),
        
                duration: 3000
        
                }).showToast();

            //Redondeo el monto

            for (let i = 0; i < selectedSourceLanguages.length; i++) {
                serviceLine.innerHTML = `
                    <li class="service-item">Translation from ${selectedSourceLanguages[i]} into ${selectedTargetLanguages[i]}</li>`;
            }
        }

        console.log(...servicesSelected);
        container.appendChild(serviceLine);

    }
}

//Para establecer la tarifa mínima por cada par de palabras / TERNARIO 

const calculateMinimumFee = () => {
    calculatePrice() < 50 ? totalAmount = 50 : totalAmount = calculatePrice();
}

//MODAL, variables, DOM y eventos

const modal = document.getElementById("modal");
const closeButtonModal = document.getElementById("close-button");
const goBackButtonModal = document.getElementById("go-back-button");
closeButtonModal.onclick = () => {
    modal.style.display = "none";
}

goBackButtonModal.onclick = () => {
    modal.style.display = "none";
}

const modalBody = document.getElementById("modal-body");

//EVENTO DE ENTER para hacer clic en submit
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        submitButton.onclick();
    }
});

//Variables

let wordCount;
let sourceLanguageSelected;
let targetLanguageSelected;
let turnaround;
let rate = 0;
let totalAmount = 0;
let totalWordcount;
let fileName;
let finalResult;
let finalTotalAmount = 0;
const selectedSourceLanguages = [];
const selectedTargetLanguages = [];
let num = 0;
let serviceLines = "";
const servicesSelected = [];

//Tasa por palabra, objetos creados con clase constructora

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

//DOM de los botones de los idiomas fuente (source languages)

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

const sourceLanguagesList = []
sourceLanguagesList.push(afrS, amhS, arcS, armS, indS, burS, camS, schS, tchS, croS, darS, dutS, engS, farS, freuS, gerS, farS, hinS, itaS, jpnS, korS, pasS, polS, portS, rusS, spaS, tagS, vietS);

//DOM de los botones de los idiomas objetivo (Target languages)

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

const targetLanguagesList = [];
targetLanguagesList.push(afrT, amhT, arcT, armT, indT, burT, camT, schT, tchT, croT, darT, dutT, engT, farT, freuT, gerT, hinT, itaT, jpnT, korT, pasT, polT, portT, rusT, spaT, tagT, vietT);

//Resultados DOM donde se mostrará monto total

let results = document.getElementById("results");

//Nombre del archivo en DOM, evento y local storage

let uploadFileButton = document.getElementById("upload-file");
let docu;

if (localStorage.getItem("filename") !== null) {
    fileName = localStorage.getItem("filename");
    docu = document.createElement("p");
    docu.innerText = fileName;
    uploadFileButton.appendChild(docu);
} else {
    fileName = document.getElementById('myFile');
}

if (document.getElementById('myFile').length > 0) {
    fileName = document.getElementById('myFile');
    localStorage.setItem("filename", fileName);
}

document.getElementById('myFile').onchange = function () {
    fileName = this.value;
    localStorage.setItem("filename", fileName);
    console.log(fileName);
    if (docu !== undefined) {
        uploadFileButton.removeChild(docu);
    } 
    docu = document.createElement("p");
    docu.innerText = fileName;
    uploadFileButton.appendChild(docu);
}


fileName = localStorage.getItem("filename");
























//EVENTOS PARA SOURCE LANGUAGES

afrS.onclick = () => {
    sourceLanguageSelected = "afrikaans";
    selectAndUnselectSource();
    afrS.className = "selected";
    console.log(sourceLanguageSelected);
}
amhS.onclick = () => {
    sourceLanguageSelected = "amharic";
    selectAndUnselectSource();
    amhS.className = "selected";
    console.log(sourceLanguageSelected);
}

arcS.onclick = () => {
    sourceLanguageSelected = "arabic";
    selectAndUnselectSource();
    arcS.className = "selected";
    console.log(sourceLanguageSelected);
}
armS.onclick = () => {
    sourceLanguageSelected = "armenian";
    selectAndUnselectSource();
    armS.className = "selected";
    console.log(sourceLanguageSelected);
}
indS.onclick = () => {
    sourceLanguageSelected = "indonesian";
    selectAndUnselectSource();
    indS.className = "selected";
    console.log(sourceLanguageSelected);
}
burS.onclick = () => {
    sourceLanguageSelected = "burmese";
    selectAndUnselectSource();
    burS.className = "selected";
    console.log(sourceLanguageSelected);
}
camS.onclick = () => {
    sourceLanguageSelected = "cambodian";
    selectAndUnselectSource();
    camS.className = "selected";
    console.log(sourceLanguageSelected);
}
schS.onclick = () => {
    sourceLanguageSelected = "simplified chinese";
    selectAndUnselectSource();
    schS.className = "selected";
    console.log(sourceLanguageSelected);
}
tchS.onclick = () => {
    sourceLanguageSelected = "traditional chinese";
    selectAndUnselectSource();
    tchS.className = "selected";
    console.log(sourceLanguageSelected);
}
croS.onclick = () => {
    sourceLanguageSelected = "croatian";
    selectAndUnselectSource();
    croS.className = "selected";
    console.log(sourceLanguageSelected);
}
darS.onclick = () => {
    sourceLanguageSelected = "dari";
    selectAndUnselectSource();
    darS.className = "selected";
    console.log(sourceLanguageSelected);
}
dutS.onclick = () => {
    sourceLanguageSelected = "dutch";
    selectAndUnselectSource();
    dutS.className = "selected";
    console.log(sourceLanguageSelected);
}
engS.onclick = () => {
    sourceLanguageSelected = "english";
    selectAndUnselectSource();
    engS.className = "selected";
    console.log(sourceLanguageSelected);
}
farS.onclick = () => {
    sourceLanguageSelected = "farsi";
    selectAndUnselectSource();
    farS.className = "selected";
    console.log(sourceLanguageSelected);
}
freuS.onclick = () => {
    sourceLanguageSelected = "french";
    selectAndUnselectSource();
    freuS.className = "selected";
    console.log(sourceLanguageSelected);
}
gerS.onclick = () => {
    sourceLanguageSelected = "german";
    selectAndUnselectSource();
    gerS.className = "selected";
    console.log(sourceLanguageSelected);
}
hinS.onclick = () => {
    sourceLanguageSelected = "hindi";
    selectAndUnselectSource();
    hinS.className = "selected";
    console.log(sourceLanguageSelected);
}
itaS.onclick = () => {
    sourceLanguageSelected = "italian";
    selectAndUnselectSource();
    itaS.className = "selected";
    console.log(sourceLanguageSelected);
}
jpnS.onclick = () => {
    sourceLanguageSelected = "japanese";
    selectAndUnselectSource();
    jpnS.className = "selected";
    console.log(sourceLanguageSelected);
}
korS.onclick = () => {
    sourceLanguageSelected = "korean";
    selectAndUnselectSource();
    korS.className = "selected";
    console.log(sourceLanguageSelected);
}
pasS.onclick = () => {
    sourceLanguageSelected = "pashto";
    selectAndUnselectSource();
    pasS.className = "selected";
    console.log(sourceLanguageSelected);
}
polS.onclick = () => {
    sourceLanguageSelected = "polish";
    selectAndUnselectSource();
    polS.className = "selected";
    console.log(sourceLanguageSelected);
}
portS.onclick = () => {
    sourceLanguageSelected = "portuguese";
    selectAndUnselectSource();
    portS.className = "selected";
    console.log(sourceLanguageSelected);
}
rusS.onclick = () => {
    sourceLanguageSelected = "russian";
    selectAndUnselectSource();
    rusS.className = "selected";
    console.log(sourceLanguageSelected);
}
spaS.onclick = () => {
    sourceLanguageSelected = "spanish";
    selectAndUnselectSource();
    spaS.className = "selected";
    console.log(sourceLanguageSelected);
}
tagS.onclick = () => {
    sourceLanguageSelected = "tagalog";
    selectAndUnselectSource();
    tagS.className = "selected";
    console.log(sourceLanguageSelected);
}
vietS.onclick = () => {
    sourceLanguageSelected = "vietnamese";
    selectAndUnselectSource();
    vietS.className = "selected";
    console.log(sourceLanguageSelected);
}

//EVENTOS PARA TARGET LANGUAGES

afrT.onclick = () => {
    targetLanguageSelected = "afrikaans";
    selectAndUnselectTarget();
    afrT.className = "selected";
    console.log(targetLanguageSelected);
}
amhT.onclick = () => {
    targetLanguageSelected = "amharic";
    selectAndUnselectTarget();
    amhT.className = "selected";
    console.log(targetLanguageSelected);
}
arcT.onclick = () => {
    targetLanguageSelected = "arabic";
    selectAndUnselectTarget();
    arcT.className = "selected";
    console.log(targetLanguageSelected);
}
armT.onclick = () => {
    targetLanguageSelected = "armenian";
    selectAndUnselectTarget();
    armT.className = "selected";
    console.log(targetLanguageSelected);
}
indT.onclick = () => {
    targetLanguageSelected = "indonesian";
    selectAndUnselectTarget();
    indT.className = "selected";
    console.log(targetLanguageSelected)
}
burT.onclick = () => {
    targetLanguageSelected = "burmese";
    selectAndUnselectTarget();
    burT.className = "selected";
    console.log(targetLanguageSelected)
}
camT.onclick = () => {
    targetLanguageSelected = "cambodian";
    selectAndUnselectTarget();
    camT.className = "selected";
    console.log(targetLanguageSelected)
}
schT.onclick = () => {
    targetLanguageSelected = "simplified chinese";
    selectAndUnselectTarget();
    schT.className = "selected";
    console.log(targetLanguageSelected)
}
tchT.onclick = () => {
    targetLanguageSelected = "traditional chinese";
    selectAndUnselectTarget();
    tchT.className = "selected";
    console.log(targetLanguageSelected)
}
croT.onclick = () => {
    targetLanguageSelected = "croatian";
    selectAndUnselectTarget();
    croT.className = "selected";
    console.log(targetLanguageSelected)
}
darT.onclick = () => {
    targetLanguageSelected = "dari";
    selectAndUnselectTarget();
    darT.className = "selected";
    console.log(targetLanguageSelected)
}
dutT.onclick = () => {
    targetLanguageSelected = "dutch";
    selectAndUnselectTarget();
    dutT.className = "selected";
    console.log(targetLanguageSelected)
}
engT.onclick = () => {
    targetLanguageSelected = "english";
    selectAndUnselectTarget();
    engT.className = "selected";
    console.log(targetLanguageSelected)
}
farT.onclick = () => {
    targetLanguageSelected = "farsi";
    selectAndUnselectTarget();
    farT.className = "selected";
    console.log(targetLanguageSelected)
}
freuT.onclick = () => {
    targetLanguageSelected = "french";
    selectAndUnselectTarget();
    freuT.className = "selected";
    console.log(targetLanguageSelected)
}
gerT.onclick = () => {
    targetLanguageSelected = "german";
    selectAndUnselectTarget();
    gerT.className = "selected";
    console.log(targetLanguageSelected)
}
hinT.onclick = () => {
    targetLanguageSelected = "hindi";
    selectAndUnselectTarget();
    hinT.className = "selected";
    console.log(targetLanguageSelected)
}
itaT.onclick = () => {
    targetLanguageSelected = "italian";
    selectAndUnselectTarget();
    itaT.className = "selected";
    console.log(targetLanguageSelected)
}
jpnT.onclick = () => {
    targetLanguageSelected = "japanese";
    selectAndUnselectTarget();
    jpnT.className = "selected";
    console.log(targetLanguageSelected)
}
korT.onclick = () => {
    targetLanguageSelected = "korean";
    selectAndUnselectTarget();
    korT.className = "selected";
    console.log(targetLanguageSelected)
}
pasT.onclick = () => {
    targetLanguageSelected = "pashto";
    selectAndUnselectTarget();
    pasT.className = "selected";
    console.log(targetLanguageSelected)
}
polT.onclick = () => {
    targetLanguageSelected = "polish";
    selectAndUnselectTarget();
    polT.className = "selected";
    console.log(targetLanguageSelected)
}
portT.onclick = () => {
    targetLanguageSelected = "portuguese";
    selectAndUnselectTarget();
    portT.className = "selected";
    console.log(targetLanguageSelected)
}
rusT.onclick = () => {
    targetLanguageSelected = "russian";
    selectAndUnselectTarget();
    rusT.className = "selected";
    console.log(targetLanguageSelected)
}
spaT.onclick = () => {
    targetLanguageSelected = "spanish";
    selectAndUnselectTarget();
    spaT.className = "selected";
    console.log(targetLanguageSelected);
}
tagT.onclick = () => {
    targetLanguageSelected = "tagalog";
    selectAndUnselectTarget();
    tagT.className = "selected";
    console.log(targetLanguageSelected);
}
vietT.onclick = () => {
    targetLanguageSelected = "vietnamese";
    selectAndUnselectTarget();
    vietT.className = "selected";
    console.log(targetLanguageSelected);
}

const cart = document.getElementById("cart");
addButton = document.createElement("button");
addButton.className = "add-button";
addButton.innerText = "Add language pair";

const container = document.createElement("div");
container.className = "cart-container";
cart.append(container);

cart.append(addButton);
addButton.onclick = () => {
    addToCart();
}

//Botones en DOM para el tiempo elegido (turnaround), DOM y eventos

let asap = document.getElementById("asap");
let notrush = document.getElementById("notrush");
const turnaroundList = [];
turnaroundList.push(asap, notrush);

asap.onclick = () => {
    turnaround = "As soon as possible";
    selectAndUnselectTurnaround();
    asap.className = "selected";
    console.log(turnaround);
}

notrush.onclick = () => {
    turnaround = "Standard turnaround";
    selectAndUnselectTurnaround();
    notrush.className = "selected";
    console.log(turnaround);
}

//SUBMIT (botón para finalizar), debug y muestro resultados

submitButton = document.getElementById("submit");

submitButton.onclick = () => {

    if ((avoidErrors(sourceLanguageSelected)) && (avoidErrors(targetLanguageSelected)) && (avoidErrors(fileName)) && (avoidErrors(turnaround)) && (avoidErrors(totalWordcount))) {

        //Establezco tarifa de urgencia

        if (turnaround == "As soon as possible") {
            finalTotalAmount = finalTotalAmount * 1.30;
        }

        //Muestro los resultados en el HTML

        let mainsection = document.getElementById("main-section");
        mainsection.innerHTML = "";
        results.append(container);

        //Botón para descargar el presupuesto en PDF

        let downloadQuoteButton = document.createElement("button");
        downloadQuoteButton.classList.add("download-button");
        downloadQuoteButton.innerText = "Download Quote";
        results.append(downloadQuoteButton);
        downloadQuoteButton.onclick = () => {
            window.jsPDF = window.jspdf.jsPDF;
            const doc = new jsPDF();
            doc.text("Rolling Translations\n\n" + container.innerText + "\n\nTotal Wordcount: " + totalWordcount + "\n\nFile Name: " + fileName + "\n\nTotal Price: $" + finalTotalAmount, 10, 10);
            doc.save("QUOTE.pdf");
        }
        finalResult = document.createElement("div");
        finalResult.className = "final-result";
        finalResult.innerHTML = `\n<p>The total amount is <b>$` + finalTotalAmount + `</b>.</p>
    <h2>Would you like to proceed?</h2>
    <p>If you would like us to proceed with your request, please enter your name and email address below.</p>
    <label>Full Name:</label>
    <input id="name" type="text" placeholder="Your Full Name" required>
    <label>Email Address:</label>
    <input id="email" type="text" placeholder="Your Email Address" required>
    <button id="send"><p>Send</p></button>`;
        results.append(finalResult);

        let sendButton = document.getElementById("send");
        sendButton.onclick = () => {
            sendEmail();
            sendButton.innerText = "Please wait...";
        }

        //Borro file name y wordcount del localStorage
        localStorage.clear();
    }
}

