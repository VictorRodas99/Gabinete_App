/**
 * Saves the array in localStorage
 * @param {Array<{productName: String, price: Number}>} currentCarrito 
 */
 const saveCarrito = currentCarrito => {
    try {
        localStorage.setItem('carrito', JSON.stringify(currentCarrito))
    } catch (error) {
        console.error(error)
    }
}


/**
 * Returns the price without any character
 * @param {String} price 
 * @returns {Number}
 */
const getPriceFormat = price => {
    const priceNumber = parseInt(price.replace(/\D/g, ''))
    return isNaN(priceNumber) ? 0 : priceNumber
}


/**
 * @param {Number} price 
 * @returns {String} The price with thousand separator, the character separator is a period (.)
 */
const getFinalFormat = price => price.toLocaleString('de-DE')


/**
 * Validates if exists data in the Node element,
 * and if the product price inside data is a correct number
 * @param {Node} details
 * @returns { {isCorrect: Boolean, price: Number} }
 */
const validateData = details => {
    const defaultReturn = { isCorrect: false, price: 0 }

    if(!details) return defaultReturn

    let price = details.childNodes[0].textContent
    price = getPriceFormat(price)

    if(!price) return defaultReturn
    
    return {
        isCorrect: true,
        price
    }
}


/**
 * Returns an empty object if the data inside Element wasn't valid
 * @param {Element} button 
 * @returns { {productName: String, price: Number} | {}}
 */
const getProductData = button => {
    const card = button.parentElement.parentElement
    const [ img, productContainer, details ] = card.childNodes
    const productName = (productContainer.textContent).replaceAll('"', "'")

    const { isCorrect, price } = validateData(details)

    if(!isCorrect) return {}
    
    const data = { productName, price }

    carrito.push(data)
    saveCarrito(carrito)

    return data
}


/* Modal functions */

/**
 * Puts a click event for all the dumpster buttons
 */
const eventDump = () => {
    const dumps = document.getElementsByClassName("trash")
    const totalPriceContainer = document.querySelector("#total")

    Array.from(dumps).forEach((button, index) => {
        button.addEventListener('click', () => {
            carrito.splice(index, 1)

            const dataContainer = button.parentElement.parentElement
            dataContainer.innerHTML = ''
            modalBody.removeChild(dataContainer)

            counter -= 1;
            bubbleCounter.innerText = counter
            
            const newTotal = getTotalPrice(carrito)
            totalPriceContainer.innerText = `Total: Gs. ${getFinalFormat(newTotal)}`
            saveCarrito(carrito)
        })
    })
}


/**
 * @param {Array<{productName: String, price: Number}>} carrito 
 * @returns {Number} The sum of all product prices
 */
const getTotalPrice = carrito => {
    let totalPrice = 0
    for(const product of carrito) {
        totalPrice += product.price
    }

    return totalPrice
}


/**
 * @param { {productName: String, price: Number, total: Number} } data 
 */
const chargeDataToModal = data => {
    counter += 1
    bubbleCounter.innerText = counter

    const dataContainer = document.createElement("div")
    const name = document.createElement("p")
    const subContainer = document.createElement("div")
    const price = document.createElement("p")
    const trashButton = document.createElement("button")
    const totalPriceContainer = document.querySelector("#total")

    dataContainer.className = "modal__data-container"
    subContainer.className = "modal__subcontainer"

    trashButton.className = "trash far fa-trash-alt"
    price.className = "price"

    name.innerText = data.productName
    price.innerText = `Gs. ${getFinalFormat(data.price)}`
    totalPriceContainer.innerText = `Total: Gs. ${getFinalFormat(data.total)}`

    dataContainer.append(name)
    subContainer.append(price, trashButton)
    dataContainer.append(subContainer)

    modalBody.append(dataContainer)
    eventDump()
}