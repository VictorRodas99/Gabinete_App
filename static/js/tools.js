// local storage operations for 'carrito'
const saveCarrito = currentCarrito => {
    localStorage.setItem('carrito', JSON.stringify(currentCarrito))
}


// data treatment
const getPriceFormat = price => {
    try {
        const indexStart = price.indexOf(':')
        price = price.slice((indexStart + 1), price.length)
        price = price.replace("PYG", '').trim()
        price = parseInt(price.replaceAll('.', ''))

    } catch(error) {
        console.error(error)
        price = 0
    }

    return price
}

const getFinalFormat = price => price.toLocaleString('de-DE')

const validateData = details => {
    const defaultReturn = { isCorrect: false, price: 0 }

    let price = details.childNodes[0].textContent
    price = getPriceFormat(price)

    if(!price) return defaultReturn
    if(!details) return defaultReturn

    return {
        isCorrect: true,
        price
    }
}

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


// modal functions
const eventDump = () => {
    const dumps = document.getElementsByClassName("trash")
    const totalPriceContainer = document.querySelector("#total")

    Array.from(dumps).forEach((button, index) => {
        button.addEventListener('click', () => {
            carrito.splice(index, 1)

            button.parentElement.parentElement.innerHTML = ''
            counter -= 1;
            bubbleCounter.innerText = counter
            
            const newTotal = getTotalPrice(carrito)
            totalPriceContainer.innerText = `Total: Gs. ${getFinalFormat(newTotal)}`
            saveCarrito(carrito)
        })
    })
}

const getTotalPrice = carrito => {
    let totalPrice = 0
    for(const product of carrito) {
        totalPrice += product.price
    }

    return totalPrice
} 

const chargeDataToModal = data => {
    counter += 1
    bubbleCounter.innerText = counter

    const dataContainer = document.createElement("div")
    const name = document.createElement("p")
    const subContainer = document.createElement("div")
    const price = document.createElement("p")
    const trashButton = document.createElement("button")
    const totalPriceContainer = document.querySelector("#total")

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