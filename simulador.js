//FUNCIONES

//Para calcular el monto total por cada servicio

const calculatePrice = () => {
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

//Para calcular el monto parcial de determinado servicio que quiero eliminar del carrito y restar del monto final

const getAmount = (idNum) => {
    return servicesSelected[idNum].amount;
}

//Para que se seleccione/deseleccionen los botones del sector Turnaround time

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
    if ((e === undefined) || (e === null)) {
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

//Para comparar el par de idiomas elegido con los pares de idiomas anteriormente agregados y arrojar mensaje de error en caso de ya haberlo seleccionado

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

//Función para crear los botones con los idiomas fuente (source). Se pasan tres parámetros: la variable identificadora del idioma y de la lista a la que pertenece, el nombre del idioma como aparecerá en el botón en el HTML y la columna a la cual agregamos el botón (list 1, 2 o 3) para que se distruyan de forma unirme en el HTML.

const createSourceButton = (buttonName, languageName, listName) => {
    let button = document.createElement("li");

    button.classList.add("unselected");
    button.setAttribute("id", buttonName);
    button.innerText = capitalizeFirstLetter(languageName);
    listName.appendChild(button);
    sourceButtons.push(button);

    button.onclick = () => {
        sourceLanguageSelected = languageName;
        button.classList.remove('unselected');
        sourceButtons.forEach((language) => {
            if (language.className === "selected") {
                language.classList.remove("selected");
                language.classList.add("unselected");
            } 
        });
        button.className = "selected";
        console.log(sourceLanguageSelected);
    }
}

//Función para crear los botones con los idiomas objetivo (target). Se pasan tres parámetros: la variable identificadora del idioma y de la lista a la que pertenece, el nombre del idioma como aparecerá en el botón en el HTML y la columna a la cual agregamos el botón (list 1, 2 o 3) para que se distruyan de forma unirme en el HTML.

const createTargetButton = (buttonName, languageName, listName) => {
    let button = document.createElement("li");
    button.classList.add("unselected");
    button.setAttribute("id", buttonName);
    button.innerText = capitalizeFirstLetter(languageName);
    listName.appendChild(button);
    targetButtons.push(button);

    button.onclick = () => {
        targetLanguageSelected = languageName;
        button.classList.remove('unselected');
        targetButtons.forEach((language) => {
            if (language.className === "selected") {
                language.classList.remove("selected");
                language.classList.add("unselected");
            } 
        });
        button.className = "selected";
        console.log(targetLanguageSelected);
    }
}

//Función para establecer la tarifa mínima por cada par de idiomas / TERNARIO 

const calculateMinimumFee = () => {
    calculatePrice() < 50 ? totalAmount = 50 : totalAmount = calculatePrice();
}

//Función para enviar mail a mi casilla en caso de que el usuario desee encargar el proyecto. Se me enviará el nombre, email, servicios elegidos y archivo.

const sendEmail = () => {
    let data = {
        from_name : document.getElementById("name").value,
        email_id : document.getElementById("email").value,
        service_container : containerResults,
        file : input,
    }
    emailjs.send("service_byiyb7y", "template_r27difz", data).then(function (response) {
        modal.style.display = "block";
        modalBody.innerText = "Thank you for your inquiry! An agent will be in touch with you shortly.";
        finalResult.classList.add("hide");
        let startOver = document.createElement("button");
        startOver.classList.add("start-over");
        startOver.innerText = "START OVER";
        results.appendChild(startOver);
        startOver.onclick = () => {
            document.location.reload();
        }
    });
}

//Función para agregar un par de idiomas al carrito

const addToCart = () => {
    //Creo el contenedor del carrito
    let serviceLine = document.createElement("div");
    serviceLine.classList.add("service-lines");

    //Recupero la cantidad de palabras (wordcount) del local storage
    if (localStorage.getItem("wordcount") != null) {
        wordCount = localStorage.getItem("wordcount");
        wordCount = parseInt(wordCount);
        console.log(wordCount);
    } 

    totalWordcount = parseInt(wordCount);

    //Cálculos del precio total por los servicios elegidos
    totalAmount = calculatePrice();
    calculateMinimumFee();

    //Agrego modal con mensaje de error en caso de que el cliente no haya seleccionado un archivo o par de idiomas.
    if (avoidErrors(totalWordcount) === false) {
        modalBody.innerText = "Error. Please ensure you have selected a file, source language, target language, and wordcount. If you have already selected a source and a target language, don't forget to click on the 'Add language pair' button."
        container.appendChild(serviceLine);
    }

    //Agrego modal con mensaje de error en caso de que el cliente haya seleccionado un par de idiomas para el que no ofrecemos traducción.
    
    if ((avoidErrors(sourceLanguageSelected)) && (avoidErrors(targetLanguageSelected)) && (avoidErrors(totalWordcount)) && avoidErrors(fileName)) {
        if (isNaN(totalAmount)) {
            modal.style.display = "block";
            modalBody.innerText = "Unfortunately, we do not offer translation services for the selected language pair at this moment. Please contact us directly through our Contact Us Form to see if we can accomodate your request."
            totalAmount = 0;
            container.appendChild(serviceLine);
            //Agrego modal con mensaje de error en caso de que el cliente haya seleccionado el mismo par de idiomas nuevamente.
        } else if (compareLanguages()) {
            modal.style.display = "block";
            modalBody.innerText = "You have already selected this language pair.";
            totalAmount = 0;
            exitLoop = false;
            container.appendChild(serviceLine);
        } else {
            //Voy registrando los servicios elegidos en un array.
            servicesSelected.push({
                source: sourceLanguageSelected,
                target: targetLanguageSelected,
                amount: totalAmount,
            });

            //Sumo el monto por cada servicio al monto final.
            finalTotalAmount += totalAmount;

            //Pusheo los idiomas elegidos a dos arrays, uno de idiomas fuente y otro de idiomas objetivo, que me ayudarán a ver si se repiten los idiomas.
            selectedSourceLanguages.push(capitalizeFirstLetter(sourceLanguageSelected));
            selectedTargetLanguages.push(capitalizeFirstLetter(targetLanguageSelected));

            //Establezco la tasa por palabra según el par de idiomas elegido.
            rate = calculateRate();

            //Redondeo el monto final.
            finalTotalAmount = Math.round(finalTotalAmount);
            console.log(finalTotalAmount);

            //Toastify. Alerta cada vez que agreo un par de idiomas al carrito.
            Toastify({

                text: "You selected " + capitalizeFirstLetter(sourceLanguageSelected) + " into " + capitalizeFirstLetter(targetLanguageSelected),
        
                duration: 3000
        
                }).showToast();

            //Contenedor del carrito con botón para remover el servicio

            //Dibujo el contenedor del carrito con los idiomas que el cliente va eligiendo.
            for (let i = 0; i < selectedSourceLanguages.length; i++) {
                serviceLine.innerHTML = `
                    <li class="service-item">Translation from ${selectedSourceLanguages[i]} into ${selectedTargetLanguages[i]}</li>`;
                //Creo un botón para eliminar cada servicio
                let removeButton = document.createElement("p");
                removeButton.innerText = "🗑️";
                removeButton.classList.add("remove-button");
                serviceLine.appendChild(removeButton);

                //Agrego el evento al botón para eliminar del carrito.
                removeButton.onclick = () => {
                    container.removeChild(serviceLine);
                    finalTotalAmount = finalTotalAmount - getAmount(i);
                    //Quito los idiomas del array de idiomas fuente y objetivo.
                    selectedSourceLanguages.splice(i, 1);
                    selectedTargetLanguages.splice(i, 1);
                }
            }
        }

        //Agrego el contenedor a la página.
        container.appendChild(serviceLine);
    }
}

//Leo el archivo subido por el cliente y obtengo cantidad de palabras
const input = document.getElementById("myFile");
input.addEventListener('change', function (e) {
    console.log(input.files)
    const reader = new FileReader();
    reader.onload = function () {
        const lines = reader.result.split('\n').map(function (line) {
        return line.split(" ");
    });
    arrayOfWords = lines.toString();
    stringOfWords = arrayOfWords.replace(/"/g, "");
    stringOfWords = stringOfWords.replace(/,/g, " ");
    wordcountOfFile = stringOfWords.split(" ");
    wordCount = wordcountOfFile.length;

    //Guardo la cantidad de palabras en el local storage
    localStorage.setItem("wordcount", wordCount);
    console.log(wordCount);
    }
    reader.readAsText(input.files[0]);
}, false)

//MODAL: Creo el modal y los respectivos eventos (cruz para cerrarlo, botón "go back", etc.)

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

//Inicialización/declaración de variables y arrays

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
let exitLoop = false;
let arrayOfWords = [];
let stringOfWords;
let wordcountOfFile;
let containerResults;

//Creo objetos con fórmula constructora de cada uno de los servicios que ofrecemos. Los uso para obtener la tasa por palabra de cada servicio.

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
const spaafr = new Service("spanish", "afrikaans", 0.18);
const spaamh = new Service("spanish", "amharic", 0.18);
const spaarc = new Service("spanish", "arabic", 0.18);
const spaarm = new Service("spanish", "armenian", 0.18);
const spaind = new Service("spanish", "indonesian", 0.18);
const spabur = new Service("spanish", "burmese", 0.18);
const spacam = new Service("spanish", "cambodian", 0.18);
const spasch = new Service("spanish", "simplified chinese", 0.18);
const spatch = new Service("spanish", "traditional chinese", 0.18);
const spacro = new Service("spanish", "croatian", 0.18);
const spadar = new Service("spanish", "dari", 0.18);
const spadut = new Service("spanish", "dutch", 0.18);

//Subo los objetos a un array para su uso en funciones.

const services = [];

services.push(engafr, afreng, engamh, amheng, engarc, arceng, engarm, armeng, engind, indeng, engbur, bureng, engcam, cameng, engsch, scheng, engtch, tcheng, engcro, croeng, engdar, dareng, engdut, duteng, engdar, dareng, engdut, duteng, engfar, fareng, engfreu, freueng, engger, gereng, enghin, hineng, engita, itaeng, engjpn, jpneng, engkor, koreng, engpas, paseng, engpol, poleng, engport, porteng, engrus, ruseng, engspa, spaeng, engtag, tageng, engviet, vieteng, spaafr, spaamh, spaarc, spaarm, spaind, spabur, spacam, spasch, spatch, spacro, spadar, spadut);

//DOM de los botones de los idiomas fuente y objetivo

let listSource = document.getElementById("list-source");
let listTarget = document.getElementById("list-target");

//Creo 3 listas en DOM (una para cada columna) así los botones se distribuyen de forma uniforme.
let sourceList1 = document.createElement("ul");
sourceList1.classList = "source1";
let sourceList2 = document.createElement("ul");
sourceList2.classList = "source2";
let sourceList3 = document.createElement("ul");
sourceList3.classList = "source3";

listSource.append(sourceList1);
listSource.append(sourceList2);
listSource.append(sourceList3);

let targetList1 = document.createElement("ul");
targetList1.classList = "target1";
let targetList2 = document.createElement("ul");
targetList2.classList = "target2";
let targetList3 = document.createElement("ul");
targetList3.classList = "target3";

listTarget.append(targetList1);
listTarget.append(targetList2);
listTarget.append(targetList3);

//Creo arrays con los botones para luego usarlos en la función para agregar los botones al HTML.

const sourceButtons = [];
const targetButtons = [];

//Arrays de los idiomas a mostrar en cada uno de los botones y los nombres para identificar cada botón

const languageArray = ["afrikaans", "amharic", "arabic", "armenian", "indonesian", "burmese", "cambodian", "simplified chinese", "traditional chinese", "croatian", "dari", "dutch", "english", "farsi", "french", "german", "hindi", "italian", "japanese", "korean", "pashto", "polish", "portuguese", "russian", "spanish", "tagalog", "vietnamese"];

const sourceLanguagesList = ["afrS", "amhS", "arcS", "armS", "indS", "burS", "camS", "schS", "tchS", "croS", "darS", "dutS", "engS", "farS", "freuS", "gerS", "hinS", "itaS", "jpnS", "korS", "pasS", "polS", "portS", "rusS", "spaS", "tagS", "vietS"];

const targetLanguagesList = ["afrT", "amhT", "arcT", "armT", "indT", "burT", "camT", "schT", "tchT", "croT", "darT", "dutT", "engT", "farT", "freuT", "gerT", "hinT", "itaT", "jpnT", "korT", "pasT", "polT", "portT", "rusT", "spaT", "tagT", "vietT"];

//For loops para crear los botones de idiomas fuente (uno por cada una de las 3 columnas)

for (let i = 0; i < 9; i++) {
    createSourceButton(sourceLanguagesList[i], languageArray[i], sourceList1);
}

for (let i = 9; i < 18; i++) {
    createSourceButton(sourceLanguagesList[i], languageArray[i], sourceList2);
}

for (let i = 18; i < 27; i++) {
    createSourceButton(sourceLanguagesList[i], languageArray[i], sourceList3);
}

//For loops para crear los botones de idiomas objetivo (uno por cada una de las 3 columnas)

for (let i = 0; i < 9; i++) {
    createTargetButton(targetLanguagesList[i], languageArray[i], targetList1);
}

for (let i = 9; i < 18; i++) {
    createTargetButton(targetLanguagesList[i], languageArray[i], targetList2);
}

for (let i = 18; i < 27; i++) {
    createTargetButton(targetLanguagesList[i], languageArray[i], targetList3);
}

//Resultados DOM donde se mostrará monto total

let results = document.getElementById("results");

//Creo el botón para subir el archivo

let uploadFileButton = document.getElementById("upload-file");

//Obtengo el nombre del archivo del local storage o, en caso de no haberlo, obtengo el nombre a partir del archivo subido por el usuario.
let docu;

if (localStorage.getItem("filename") !== null) {
    fileName = localStorage.getItem("filename");
    docu = document.createElement("p");
    docu.innerText = fileName;
    uploadFileButton.appendChild(docu);
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

//Creo con DOM el carrito y el botón par agregar un par de idiomas.
const cart = document.getElementById("cart");
addButton = document.createElement("button");
addButton.className = "add-button";
addButton.innerText = "Add language pair";

const container = document.createElement("div");
container.className = "cart-container";
cart.append(container);
cart.append(addButton);

//Evento para agregar un par de idiomas al carrito.
addButton.onclick = () => {
    addToCart();
}

//Botones en DOM para el tiempo elegido (turnaround), los creo en DOM

let asap = document.getElementById("asap");
let notrush = document.getElementById("notrush");
const turnaroundList = [];
turnaroundList.push(asap, notrush);

//Agrego los eventos a los botones del tiempo elegido

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

//SUBMIT (botón para finalizar) en DOM y evento para finalizar la solicitud, debug y muestro resultados

submitButton = document.getElementById("submit");

submitButton.onclick = () => {

    //Chequeo que el cliente haya seleccionado todo lo necesario

    if ((avoidErrors(sourceLanguageSelected)) && (avoidErrors(targetLanguageSelected)) && (avoidErrors(fileName)) && (avoidErrors(turnaround)) && (avoidErrors(totalWordcount))) {

        //Establezco tarifa de urgencia

        if (turnaround == "As soon as possible") {
            finalTotalAmount = finalTotalAmount * 1.30;
        }

        //Redondeo

        finalTotalAmount = finalTotalAmount.toFixed(2);
        console.log(finalTotalAmount);

        //Muestro los resultados en el HTML

        let mainsection = document.getElementById("main-section");
        mainsection.innerHTML = "";
        let containerText = container.innerText;
        containerResults = containerText.replace("🗑️", "");
        do {
            containerResults = containerResults.replace("🗑️", "");
        } while (containerResults.includes("🗑️"))

        //Botón para descargar el presupuesto en PDF

        let downloadQuoteButton = document.createElement("button");
        downloadQuoteButton.classList.add("download-button");
        downloadQuoteButton.innerText = "Download Quote";
        results.append(downloadQuoteButton);
        downloadQuoteButton.onclick = () => {
            window.jsPDF = window.jspdf.jsPDF;
            const doc = new jsPDF("l", "mm", [297, 210]);
            doc.text("Rolling Translations\n\n" + containerResults + "\n\nTotal Wordcount: " + totalWordcount + "\n\nFile Name: " + fileName + "\n\nTotal Price: $" + finalTotalAmount, 10, 10);
            doc.save("QUOTE.pdf");
        }

        //Creo contenedor que mostrará el costo final y pregunta al cliente si desea que trabajemos en el proyecto.
        finalResult = document.createElement("div");
        finalResult.className = "final-result";
        finalResult.innerHTML = `\n<p>The total cost is <b>$` + finalTotalAmount + `</b>.</p>
    <h2>Would you like to proceed?</h2>
    <p>If you would like us to proceed with your request, please enter your name and email address below. One of our agents will get in touch with you shortly to confirm your project.</p>
    <label>Full Name:</label>
    <input id="name" type="text" placeholder="Your Full Name" required>
    <label>Email Address:</label>
    <input id="email" type="text" placeholder="Your Email Address" required>
    <button id="send"><p>Send</p></button>`;
        results.append(finalResult);

        //DOM y evento del botón para enviar el email con el formulario.

        let sendButton = document.getElementById("send");
        sendButton.onclick = () => {
            sendEmail();
            sendButton.innerText = "Please wait...";
        }

        //Borro file name y wordcount del localStorage
        localStorage.clear();
    }
}