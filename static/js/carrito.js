var carrito = []
var buttons = []
var counter = 0

const modal = document.querySelector(".modal-content")
const bubbleCounter = document.createElement("div")
const [ metaElement ] = document.getElementsByName("request-method")
const requestMethod = metaElement.attributes.item(1).value

const mainModalElements = [...modal.children].filter(e => e.className.includes("modal-"))
const [ modalHeader, modalBody, modalFooter ] = mainModalElements
const [ modalTitle ] = modalHeader.children

bubbleCounter.className = "counter"
modalTitle.append(bubbleCounter)


const waitButtons = setInterval(() => {
    const currentButtons = document.getElementsByClassName("add")
    const existsButtons = Boolean(currentButtons.length)

    if(existsButtons) {
        buttons = Array.from(currentButtons)
        main()
        clearInterval(waitButtons)
    }
}, 500)


function main() {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const data = getProductData(button)

            if(data) {
                sendCarrito(carrito)
                chargeDataToModal(data)
            }
        })
    })

    if(requestMethod === 'POST') {
        const externalData = getExternalData()
        carrito = [...externalData]
        
        externalData.forEach(product => chargeDataToModal(product))
    }
}