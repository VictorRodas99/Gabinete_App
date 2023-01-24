const errorMessage = document.querySelector('.error-message')
const mainDataContainer = document.querySelector(
  '.product-section__products-container'
)

const createElements = () => {
  const card = document.createElement('div')
  const cardHeader = document.createElement('div')
  const img = document.createElement('img')
  const cardBody = document.createElement('div')
  const productName = document.createElement('h2')
  const productPrice = document.createElement('p')
  const cardFooter = document.createElement('div')

  card.className = 'products-container__product'
  cardHeader.className = 'product-header'
  cardBody.className = 'product-body'
  productName.className = 'product-body__name'
  productPrice.className = 'product-body__price'
  cardFooter.className = 'product-footer'

  cardFooter.innerHTML = `
        <div class="product-footer__item">
            <button class="add material-symbols-outlined reset-button item__button">add_shopping_cart</button>
            <div class="item__message">Agregar a carrito</div>
        </div>
        <div class="product-footer__item">
            <a href="/product" class="material-symbols-outlined reset-a item__button">visibility</a>
            <div class="item__message">Ver producto</div>
        </div>
    `

  return {
    card,
    cardHeader,
    img,
    cardBody,
    productName,
    productPrice,
    cardFooter
  }
}

const setData = (data) => {
  data.forEach((product) => {
    // const info = Object.entries(product.info)
    const price = product.info.Precio
    const { imgLink, name } = product

    const {
      card,
      cardHeader,
      img,
      cardBody,
      productName,
      productPrice,
      cardFooter
    } = createElements()

    // info.forEach(([property, value]) => {
    //     const items = document.createElement("li")
    //     items.className = "list-group-item"
    //     items.innerHTML = `<strong>${property}</strong>:${value}`

    //     infoContainer.append(items)
    // })

    img.src = imgLink

    productName.textContent = name
    productPrice.textContent = price

    cardHeader.append(img)
    cardBody.append(productName, productPrice)
    card.append(cardHeader, cardBody, cardFooter)
    mainDataContainer.append(card)
  })
}
