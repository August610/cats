cards = document.querySelectorAll(".card");
cards.forEach(e => e.addEventListener("click", addPopup))

const popup = document.querySelector(".info-wrapper");
const block = document.querySelector(".info-block");
const closePopup = document.createElement("div");

closePopup.addEventListener("click", popupClose);

function addPopup() {
    popup.classList.add("active");
    block.classList.add("active");
    closePopup.classList.add("popup-close");
    popup.appendChild(closePopup);
    popup.append(h);
}

function popupClose() {
    block.classList.remove('active'); 
    popup.classList.remove('active');
}

document.addEventListener('click', (e) => { 
    if(e.target === block) { 
        popupClose();
    }
});