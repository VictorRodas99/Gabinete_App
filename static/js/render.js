const errorMessage = document.querySelector(".error-message");
const mainDataContainer = document.querySelector(".container-data");

const setData = (data) => {
    data.forEach(obj => {
        let dataContainer = document.createElement("div");
        dataContainer.className = "col-sm-3 mb-3";

        let card = document.createElement("div");
        card.className = "card";

        let infoContainer = document.createElement("ul");
        let info = Object.entries(obj.info);

        infoContainer.className = "list-group list-group-flush";

        info.forEach(([property, value]) => {
            let li = document.createElement("li");
            li.className = "list-group-item";
            li.innerHTML = `<strong>${property}</strong>:${value}`;

            infoContainer.append(li);
        })

        let img = document.createElement("img");
        img.className = "card-img-top";
        img.src = obj.imgLink;
        img.alt = "Card image cap";

        let card_title = document.createElement("div");
        card_title.className = "card-body";

        let title = document.createElement("h5");
        title.className = "card-title";
        title.innerText = obj.name;

        card_title.append(title);

        let footer = `
        <div class="card-body text-center">
            <button type="button" class="add btn-modal" value="pending" data-toggle="modal" data-target="#modal"
                style="min-width: 10rem; min-height: 3rem;"><span
                    class="fas fa-shopping-cart"></span>&nbsp;&nbsp;Agregar al
                carrito</button>
        </div>
        `;
        
        [img, card_title, infoContainer].forEach(e => card.append(e));
        
        card.insertAdjacentHTML("beforeend", footer);
        dataContainer.append(card);
        mainDataContainer.append(dataContainer);
    })
}