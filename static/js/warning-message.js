function warningMessage() {
    const modalWarning = document.querySelector('.warning-message')

    if(!modalWarning) return

    const buttonCloseWarning = document.querySelector('.close-warning-modal')

    buttonCloseWarning.addEventListener('click', () => {
        modalWarning.classList.toggle('deactive')
    })
}