class Cat {
    constructor(data, container) {
        this.data = data;
        this.container = container;
    }

    template() {
        const templateString = `
            <div class="card__item">
                <div class="card-img"></div>
                <h3></h3>
                <p class="rate"></p>
                <div class="buttonCats">
                    <button class="cat__delete">удалить</button>
                    <button class="cat__edit">ред</button>
                </div>
             </div>`;
        var element = document.createElement("div");
        element.insertAdjacentHTML('beforeend', templateString.trim());
        return element.firstChild;
    }

    addCat() {
        this.cat = this.template();
        const catData = this.data

        this.cat.querySelector("h3").textContent = this.data.name;
        this.cat.querySelector(".card-img").style.backgroundImage = `url(${this.data.img_link})`;
        const rate = this.data.rate;

        for (let i = 0; i < rate; i++) {
            this.cat.querySelector(".rate").innerHTML += `<img src='img/cat-fill.svg'>`;
        }

        for (let i = 0; i < (10 - rate); i++) {
            this.cat.querySelector(".rate").innerHTML += `<img src='img/cat-stroke.svg'>`;
        }

        this.container.appendChild(this.cat);

        const name = this.data.name;
        const age = this.data.age;
        const description = this.data.description;
        const img = `url(${this.data.img_link})`;
        const id = this.data.id;


        this.cat.querySelector(".card-img").addEventListener("click", e => {
            popupInfoCats(name, age, description, img);
        });

        const btnCats = this.cat.querySelector(".buttonCats");
        const cardButtonEdit = this.cat.querySelector('.cat__edit');
        const cardButtonDelete = this.cat.querySelector('.cat__delete');

        cardButtonEdit.addEventListener('click', buttonEditCat);
        cardButtonDelete.addEventListener('click', buttonDeleteCat);

        function buttonDeleteCat() {
            const cofirm = confirm("Действительно хотите удалить котика?")
            if (true) {
                api.deleteCat(id).then(() => {
                    reloadData();
                    const oldData = getLocalStorageData('cats');
                    const newData = oldData.filter(item => item.id !== catData.id);
                    setLocalStorageData('cats', newData);
                })
            }
        }

        function buttonEditCat() {
            const inputs = formEdit.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = catData[input.name];
                addPopup(popupEditCats);
            })
        }

        if (Cookies.get('user')) {
            btnCats.classList.add("show");
        }
        if (!Cookies.get('user')) {
            btnCats.classList.remove("show");
        }
    }
}