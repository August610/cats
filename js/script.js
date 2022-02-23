const cardList = document.querySelector('.container-card');

const popup = document.querySelector(".info-wrapper");
const block = document.querySelector(".info-block");
const closePopup = document.createElement("div");

closePopup.addEventListener("click", popupClose);

function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function addPopup(name, age, description, img) {
    popup.classList.add("active");
    block.classList.add("active");
    closePopup.classList.add("popup-close");
    popup.appendChild(closePopup);
    popup.querySelector(".info-img").style.backgroundImage = img;
    popup.querySelector("h2").innerText = name;
    popup.querySelector("h3").innerText = age + " " + declOfNum(age, ['год', 'года', 'лет']);
    popup.querySelector("p").textContent = description;
}

function popupClose() {
    block.classList.remove('active');
    popup.classList.remove('active');
}
document.addEventListener('click', (e) => {
    if (e.target === block) {
        popupClose();
    }
});

data.forEach(item => {
    const cat = new Cat(item, cardList);
    cat.addCat();
  });
