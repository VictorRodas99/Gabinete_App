const socket = io.connect(`http://${document.domain}:${location.port}`);
const chargin = document.querySelector(".charging-section");
const mainContainer = document.querySelector(".main-container");


socket.on('Response', res => {
    if(res === undefined) {
      errorMessage.style.display = "block";
      return;
    }

    setData(res);

    document.title = "Home";
    chargin.style.display = "none";
    mainContainer.style.display = "block";

})