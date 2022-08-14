//Global variables
var carrito = [];
var counter = 0;
var buttons;

//HTML elements
const modal = document.querySelector(".modal-content");
const bubbleCounter = document.createElement("div");
bubbleCounter.className = "counter";

let modalHeader, modalBody, modalFooter;

Array.from(modal.children).forEach(e => { 
    if(e.className === "modal-body") modalBody = e;
    else if(e.className === "modal-header") modalHeader = e;
    else if(e.className === "modal-footer") modalFooter = e;
});

const modalTitle = modalHeader.children[0];
modalTitle.append(bubbleCounter);

//I put an interval to find the buttons because when the script loads, the buttons still don't load
const intervalID = setInterval(() => {
    let buttonsLocal = document.getElementsByClassName("add");

    if(buttonsLocal.length > 0) {
        buttons = buttonsLocal;
        main();
        clearInterval(intervalID);
    }

}, 500)

const getPriceFormat = (price) => {

    try {
        let indexStart = price.indexOf(':');
        price = price.slice((indexStart + 1), price.length);
        price = price.replace("Gs.", '').trim();
        price = parseInt(price.replaceAll('.', ''));

    } catch (error) {
        console.error(error);
        price = 0;
    }

    return price
}

const getPriceFinalFormat = (price) => {
    //TODO: hacer los separadores de miles para el precio
}


const getData = (button) => {
    let parentCard = button.parentElement.parentElement
    let productName = parentCard.childNodes[1].textContent
    let info = parentCard.childNodes[2];

    if(!info) return {}; //Validation

    let price = info.childNodes[0].textContent; 
    price = getPriceFormat(price);

    if(!price) return {}; //Validation

    data = {
        "productName": productName,
        "price": price
    }

    carrito.push(data);

    return data;
}

const chargeDataToModal = (data) => {
    counter+=1;
    bubbleCounter.innerText = counter;

    let dataContainer = document.createElement("div");
    let name = document.createElement("p");
    let price = document.createElement("p");
    let trashButton = document.createElement("button");

    trashButton.id = counter;
    trashButton.className = "trash far fa-trash-alt";
    price.className = "price";

    name.innerText = data.productName;
    price.innerText = `Gs. ${data.price}`;

    dataContainer.append(name);
    dataContainer.append(price);
    dataContainer.append(trashButton);

    modalBody.append(dataContainer);

}


function main() {
    Array.from(buttons).forEach(button => {
        button.addEventListener("click", () => {
            let data = getData(button);
            if(data) chargeDataToModal(data);
        })
    })
}