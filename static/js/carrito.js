var carrito = []
var buttons = []


const modal = document.querySelector(".cart-main-container")
const toExcelButton = document.querySelector("#footer__button-save")
const productCounter = document.querySelector("#header__counter")

const mainModalElements = [...modal.children].filter(e => e.className.includes("shopping-cart__"))
const [ modalHeader, modalBody, modalFooter ] = mainModalElements


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

            if(Object.keys(data).length) {
                data.total = getTotalPrice(carrito)
                saveCarrito(carrito)
                chargeDataToModal(data, carrito.length + 1)
            }
        })
    })

    if(externalData) {
        externalData = JSON.parse(externalData)
        carrito = [...externalData]
        externalData.forEach((product, counter) => chargeDataToModal(product, counter + 1))
    }
}