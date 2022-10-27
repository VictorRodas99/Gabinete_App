// local storage operations for 'carrito'
const saveCarrito = currentCarrito => {
    localStorage.setItem('carrito', JSON.stringify(currentCarrito))
}


// data treatment
const getPriceFormat = price => {
    const priceNumber = Number(price.replace(/\D/g, ''))
    return isNaN(priceNumber) ? 0 : priceNumber
}

const getFinalFormat = price => price.toLocaleString('de-DE')

const validateData = price => {
    price = getPriceFormat(price)

    if(!price) return { isCorrect: false, price: 0 }

    return {
        isCorrect: true,
        price
    }
}

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


// modal functions
const eventDump = () => {
    // const dumps = document.getElementsByClassName("trash")
    // const totalPriceContainer = document.querySelector("#total")

    // Array.from(dumps).forEach((button, index) => {
    //     button.addEventListener('click', () => {
    //         carrito.splice(index, 1)

    //         button.parentElement.parentElement.innerHTML = ''
    //         counter -= 1;
    //         bubbleCounter.innerText = counter
            
    //         const newTotal = getTotalPrice(carrito)
    //         totalPriceContainer.innerText = `Total: Gs. ${getFinalFormat(newTotal)}`
    //         saveCarrito(carrito)
    //     })
    // })
    console.log("agregado")
}

const getTotalPrice = carrito => {
    let totalPrice = 0
    for(const product of carrito) {
        totalPrice += product.price
    }

    return totalPrice
} 

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