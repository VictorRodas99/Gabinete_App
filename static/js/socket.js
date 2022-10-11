const socket = io.connect(`http://${document.domain}:${location.port}`)
const chargin = document.querySelector(".charging-section")
const mainContainer = document.querySelector(".main-container")

/**
 * Emit an event for the backend to receive the data and transform it into an xlsx file
 *  @param {Array<{productName: String, price: Number}>} carrito 
 */
const carritoToExcel = carrito => socket.emit('carrito', { carrito })

socket.on('carrito', data => {
  const currentURL = window.location.href
  const { url } = data
  const newUrl = `${currentURL}${url}`

  window.location.href = newUrl
})

socket.on('Response', res => {
    if(res === undefined || res.length === 0) {
      errorMessage.style.display = "block"
      return
    }

    document.title = "Home"
    chargin.style.display = "none"

    mainDataContainer.innerHTML = '' //Remove if exists data in the container
    setData(res.reverse()) //Charge the new data

    mainContainer.style.display = "block"
})