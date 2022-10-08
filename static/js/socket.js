const socket = io.connect(`http://${document.domain}:${location.port}`)
const chargin = document.querySelector(".charging-section")
const mainContainer = document.querySelector(".main-container")


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