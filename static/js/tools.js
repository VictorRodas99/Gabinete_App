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
    let data

    const { isCorrect, price } = validateData(details)

    if(isCorrect) data = { productName, price }
    else return {}

    carrito.push(data)
    return data
}


// modal functions
const eventDump = () => {
    const dumps = document.getElementsByClassName("trash")

    Array.from(dumps).forEach((button, index) => {
        button.addEventListener('click', () => {
            carrito.splice(index, 1)

            button.parentElement.parentElement.innerHTML = ''
            counter -= 1;
            bubbleCounter.innerText = counter

            sendCarrito(carrito)
        })
    })
}

const chargeDataToModal = data => {
    counter += 1
    bubbleCounter.innerText = counter

    const dataContainer = document.createElement("div")
    const name = document.createElement("p")
    const subContainer = document.createElement("div")
    const price = document.createElement("p")
    const trashButton = document.createElement("button")

    subContainer.className = "modal__subcontainer"

    trashButton.className = "trash far fa-trash-alt"
    price.className = "price"

    name.innerText = data.productName
    price.innerText = `Gs. ${getFinalFormat(data.price)}`

    dataContainer.append(name)
    subContainer.append(price, trashButton)
    dataContainer.append(subContainer)

    modalBody.append(dataContainer)
    eventDump()
}