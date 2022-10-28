/**
 * Saves the array in localStorage
 * @param {Array<{productName: string, price: number}>} currentCarrito 
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
 * @param {string} price 
 * @returns {number}
 */
const getPriceFormat = price => {
    const priceNumber = Number(price.replace(/\D/g, ''))
    return isNaN(priceNumber) ? 0 : priceNumber
}


/**
 * @param {number} price 
 * @returns {string} The price with thousand separator, the character separator is a period (.)
 */
const getFinalFormat = price => price.toLocaleString('de-DE')


/**
 * @param {string} price
 * @returns { {isCorrect: boolean, price: number} }
 */
const validateData = price => {
    price = getPriceFormat(price)

    if(!price) return { isCorrect: false, price: 0 }

    return {
        isCorrect: true,
        price
    }
}


/**
 * Returns an empty object if the data inside Element wasn't valid
 * @param {Element} button 
 * @returns { {productName: string, price: number, img: string} | {}}
 */
const getProductData = button => {
    const card =  button.closest(".products-container__product")
    const [ cardHeader, cardBody ] = card.childNodes
    const [ dirtyName, dirtyPrice] = cardBody.childNodes
    const [ img ] = cardHeader.childNodes
 
    const productName = (dirtyName.textContent).replaceAll('"', "'")
    const { isCorrect, price } = validateData(dirtyPrice.textContent)

    if(!isCorrect) return {}
    
    const data = { productName, price, img: img.src }

    carrito.push(data)
    saveCarrito(carrito)

    return data
}


/* Modal functions */

/**
 * Puts a click event for all the dumpster buttons
 */
const eventDump = () => {
    const dumps = document.querySelectorAll(".product-trash > span")
    const totalPriceContainer = document.querySelector("#header__counter")

    const getProductName = container => {
        const siblings = container.parentElement.children
        const [ nameContainer ] = [...siblings].filter(element => element.className === "product-details")
        const productName = nameContainer.firstChild.textContent

        return productName
    }

    dumps.forEach(button => {
        button.addEventListener('click', () => {
            const productName = getProductName(button.parentElement)
            console.log(productName) //TODO: this has a strange behavior (it gets triggered more than once)
        })
    })
}


/**
 * @param {Array<{productName: string, price: number}>} carrito 
 * @returns {number} The sum of all product prices
 */
const getTotalPrice = carrito => {
    let totalPrice = 0
    for(const product of carrito) {
        totalPrice += product.price
    }

    return totalPrice
} 


/**
 * @param { {productName: string, price: number, img: string} } data
 * @param {number} counter 
 */
const chargeDataToModal = (data, counter) => {
    productCounter.innerText = 
        counter === 1
        ? `${counter} item`
        : `${counter} items`

    const bodyCard = document.querySelector(".shopping-cart__body")

    const bodyProduct = document.createElement("div")
    const imgContainer = document.createElement("div")
    const img = document.createElement("img")

    const productDetails = document.createElement("div")
    const name = document.createElement("p")

    const counterContainer = document.createElement("div")
    const priceContainer = document.createElement("div")
    const price = document.createElement("p")

    const specificCounter = document.createElement("p")
    const trashContainer = document.createElement("div")
    const trashButton = document.createElement("span")

    bodyProduct.className = "body__product"
    imgContainer.className = "product-img"
    productDetails.className = "product-details"
    counterContainer.className = "product-specific-counter"
    priceContainer.className = "product-price"
    trashContainer.className = "product-trash"


    img.src = data.img
    img.alt = "cart-product"

    name.id = "details__product-name"
    name.innerText = data.productName

    specificCounter.innerText = 2 //temporal

    price.innerText = `Gs. ${getFinalFormat(data.price)}`

    trashButton.className = "material-symbols-outlined"
    trashButton.innerText = "delete"

    imgContainer.append(img)
    productDetails.append(name)
    counterContainer.append(specificCounter)
    priceContainer.append(price)
    trashContainer.append(trashButton)

    bodyProduct.append(imgContainer, productDetails,
            counterContainer, priceContainer, trashContainer)
    
    bodyCard.append(bodyProduct)
    eventDump()
}