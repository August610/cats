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
             </div>`;
        var element = document.createElement("div");
        element.insertAdjacentHTML('beforeend', templateString.trim());
        return element.firstChild;
    }

    addCat() {
        this.cat = this.template();
        this.cat.querySelector("h3").textContent = this.data.name;
        this.cat.querySelector(".card-img").style.backgroundImage = `url(${this.data.img_link})`;

        const rate = this.data.rate;
        for(let i = 0; i <= rate; i++){
            this.cat.querySelector(".rate").innerHTML += `<img src='img/cat-fill.svg'>`;
        }
        for(let i = 0; i < (10-rate); i++){
            this.cat.querySelector(".rate").innerHTML += `<img src='img/cat-stroke.svg'>`;
        }
        // <img src="img/cat-fill.svg" alt="^_^"></img>
        this.container.appendChild(this.cat);

        const name = this.data.name;
        const age = this.data.age;
        const description = this.data.description;
        const img = `url(${this.data.img_link})`;
        
        this.cat.addEventListener("click", e => {
                addPopup(name, age, description, img);
        });
    }
}