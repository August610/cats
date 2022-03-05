const cardList = document.querySelector('.container-card');
const popup = document.querySelector(".info-block");
const popupCloseForm = document.querySelector(".popup");

const rootPopup = document.querySelector('.root-popup');
const popupCats = document.querySelector('.popup_type_cats-info');
const popupAddCats = document.querySelector('.popup_type_cats-add');
const popupEditCats = document.querySelector('.popup_type_cats-edit');

const formAdd = popupAddCats.querySelector('.popup__form');
const formEdit = popupEditCats.querySelector('.popup__form');

const catImages = document.querySelectorAll('.cat__image');
const cardTemplate = document.querySelector('#card-tempalte');
const cardListContainer = document.querySelector('.cats-list');

const buttonReloadData = document.querySelector('.reload-data');
const buttonAddCat = document.querySelector('.button-add-cat');

const buttonShowById = document.querySelector(".buttonShowById");
const inputShowById = document.querySelector(".inputShowById");
const popupId = document.querySelector(".popup__form-input");
const idCat = popupId.querySelector("#id");

const closePopup = document.createElement("div");

closePopup.addEventListener("click", popupClose);
buttonAddCat.addEventListener('click', handleClickButtonAdd);
buttonReloadData.addEventListener('click', reloadData);

const authForm = document.querySelector('.auth-form');
const inputName = authForm.querySelector('.auth-form__input');
const bntAuth = authForm.querySelector(".auth-form__submit-btn");

const btnInfo = document.querySelector(".buttonsInfoCats");
const authCats = document.querySelector(".auth")

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputName.value.trim() !== "") {
        document.cookie = `user=${inputName.value}; secure; samesite=lax;`
        inputName.value = "";
        location.reload();
    }
    else {
        alert('Введите данные перед сохранением')
    }
})

if (Cookies.get('user')) {
    btnInfo.classList.add("show");
    authCats.classList.add("show");
}
if (!Cookies.get('user')) {
    btnInfo.classList.remove("show");
    authCats.classList.remove("show");
}


function getLocalStorageData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorageData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function handleClickButtonAdd() {
    addPopup(popupAddCats);
}

function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function popupInfoCats(name, age, description, img) {
    popup.querySelector(".info-img").style.backgroundImage = img;
    popup.querySelector("h2").innerText = name;
    popup.querySelector("h3").innerText = age + " " + declOfNum(age, ['год', 'года', 'лет']);
    popup.querySelector("p").textContent = description;
    addPopup(popup);
}

function addPopup(arg1) {
    arg1.classList.add("active");
    arg1.firstElementChild.appendChild(closePopup);
    closePopup.classList.add("popup-close");
}

function popupClose() {
    const popupActive = document.querySelector(".active");
    if (popupActive)
        popupActive.classList.remove("active");
}

// document.addEventListener('click', (e) => {
//     if (e.target === document.body) {
//         popupClose();
//     }
// });

function formSerialize(form) {
    const result = {}
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        result[input.name] = input.value;
    })
    return result;
}

formAdd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const bodyJSON = formSerialize(formAdd)
    api.addCat(bodyJSON)
        .then((data) => {
            if (data.message === 'ok') {
                reloadData();
                popupClose();
            }
        })
        .catch(err => {
            console.log(err);
        })
})

formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const bodyJSON = formSerialize(formEdit)
    api.updateCat(formEdit.id.value, bodyJSON)
        .then((data) => {
            if (data.message === 'ok') {
                reloadData();
                popupClose();
            }
        })
})

function reloadData() {
    localStorage.clear();
    cardList.innerHTML = "";
    addCats()
}

function addCats() {
    let cats = [];
    api.getAllCats()
        .then(dataCats => {
            if (dataCats.message === "ok") {
                console.log(dataCats.data);
                localStorage.setItem('cats', dataCats)
                dataCats.data.forEach(e => {
                    for (let k in e) {
                        if (k === "__v") {
                            dataCats.data.splice(e, 1);
                            console.log(e.id);
                        }
                    }
                })
                console.log(dataCats.data);
                //cats.push(dataCats.data)
                console.log(dataCats.data);
                addDataCat(dataCats.data);
            }
        })
}

function addDataCat(data) {
    data.forEach(data => {
        delete data.k;
        const cat = new Cat(data, cardList);
        cat.addCat();
    })
}

buttonShowById.onclick = () => {
    api.getCatById(inputShowById.value)
        .then(data => {
            if (data.message === "ok") {
                console.log(data);
                cardList.innerHTML = "";
                const cat = new Cat(data.data, cardList);
                cat.addCat();
                inputShowById.value = "";
            }
        })
}
addCats();
// data.forEach(item => {
//     const cat = new Cat(item, cardList);
//     cat.addCat();
// });
