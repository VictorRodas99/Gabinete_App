var carrito = []
var buttons = []
var counter = 0

const modal = document.querySelector(".modal-content")
const toExcelButton = document.querySelector(".btn-excel")
const bubbleCounter = document.createElement("div")

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
    let externalData = localStorage.getItem('carrito')

    toExcelButton.addEventListener('click', () => {
        if(carrito.length < 0) return
        carritoToExcel(carrito)
    })

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const data = getProductData(button)

            if(data) {
                data.total = getTotalPrice(carrito)
                saveCarrito(carrito)
                chargeDataToModal(data)
            }
        })
    })

    if(externalData) {
        externalData = JSON.parse(externalData)
        carrito = [...externalData]
        externalData.forEach(product => chargeDataToModal(product))
    }
}