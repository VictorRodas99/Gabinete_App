const errorMessage = document.querySelector(".error-message")
const mainDataContainer = document.querySelector(".container-data")

const createElements = () => {
    const dataContainer = document.createElement("div")
    const card = document.createElement("div")
    const infoContainer = document.createElement("ul")
    const img = document.createElement("img")
    const cardTitle = document.createElement("div")
    const title = document.createElement("h5")
    
    const footer = `
    <div class="card-body text-center">
        <button type="button" class="add btn-modal" value="pending" data-toggle="modal" data-target="#modal"
            style="min-width: 10rem; min-height: 3rem;"><span
                class="fas fa-shopping-cart"></span>&nbsp;&nbsp;Agregar al
            carrito</button>
    </div>
    `
    dataContainer.className = "col-sm-3 mb-3"
    card.className = "card"
    infoContainer.className = "list-group list-group-flush"
    img.className = "card-img-top"
    img.alt = "Card image cap"
    cardTitle.className = "card-body"
    title.className = "card-title"

    return [
        dataContainer, card, infoContainer,
        img, cardTitle, title,
        footer
    ]
}

const setData = (data) => {
    data.forEach(product => {
        const info = Object.entries(product.info)
        const { imgLink, name } = product
        const [
            dataContainer, card, infoContainer,
            img, cardTitle, title, footer
        ] = createElements()
        
        info.forEach(([property, value]) => {
            const items = document.createElement("li")
            items.className = "list-group-item" 
            items.innerHTML = `<strong>${property}</strong>:${value}`

            infoContainer.append(items)
        })

        img.src = imgLink
        title.innerText = name

        cardTitle.append(title)

        card.append(img)
        card.append(cardTitle)
        card.append(infoContainer)
        card.insertAdjacentHTML("beforeend", footer)

        dataContainer.append(card)
        mainDataContainer.append(dataContainer)
    })
}