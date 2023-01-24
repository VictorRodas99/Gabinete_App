const buttonMenu = document.querySelector('#button-menu')
const optionsMenu = document.querySelector('.menu__responsive-nav')
const options = optionsMenu.children

const modalContainer = document.querySelector('.cart-main-container')
const buttonModal = document.querySelector('.shopping-cart-button')
const overAll = document.querySelector('.modal-blocker')
const buttonClose = document.querySelector('#close-modal')

/* Menu */
buttonMenu.addEventListener('click', () => {
  optionsMenu.classList.toggle('active')
  Array.from(options).forEach((e) => e.classList.toggle('item-active'))
})

/* Carrito */
const toggleModal = () => {
  modalContainer.classList.toggle('active-modal')
  overAll.classList.toggle('overlay')
}

buttonModal.addEventListener('click', toggleModal)
buttonClose.addEventListener('click', toggleModal)
