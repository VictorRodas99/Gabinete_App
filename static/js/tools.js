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

            button.parentElement.innerHTML = ''
            counter -= 1;
            bubbleCounter.innerText = counter

            sendCarrito(carrito)
        })
    })
}

const chargeDataToModal = data => {
    counter += 1
    bubbleCounter.innerText = counter

    let dataContainer = document.createElement("div")
    let name = document.createElement("p")
    let price = document.createElement("p")
    let trashButton = document.createElement("button")

    trashButton.className = "trash far fa-trash-alt"
    price.className = "price"

    name.innerText = data.productName
    price.innerText = `Gs. ${getFinalFormat(data.price)}`

    dataContainer.append(name)
    dataContainer.append(price)
    dataContainer.append(trashButton)

    modalBody.append(dataContainer)
    eventDump()
}