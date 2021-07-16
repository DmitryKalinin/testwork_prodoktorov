import { General } from "./General.js";

export class Images extends General {
    imageElement = (image, titleImage, width) => {
        let img = document.createElement("img");
        img.setAttribute("src", image.url);
        img.setAttribute("width", width);

        img.addEventListener("click", () => {
            this.showPopup(image);

        })
        img.addEventListener("mouseover", () => {
            titleImage.style.display = "block";
            img.addEventListener("mouseout", () => {
                titleImage.style.display = "none";
            })

        })
        return img
    }
    starElement = (image) => {
        let star = document.createElement("img");
        if (localStorage.getItem(`${image.id}`) === null) {
            star.setAttribute("src", "./star-svg.svg");
        } else {
            star.setAttribute("src", "./star-enable.svg");
        }
        star.setAttribute("width", "15px");
        star.classList.add("star");
        star.addEventListener("click", () => {
            this.addImagetoLocalStorage(star, image);
        })
        return star;
    }
    popupText = (text) => {
        let titleImage = document.createElement("span");
        titleImage.classList.add("popup-text");
        titleImage.textContent = text;
        return titleImage;
    }
    showPopup = (image) => {
        const popup = document.getElementById("popup")
        console.log("КЛИК ПО КАРТИНКЕ");
        popup.innerHTML = "";
        popup.style.display = "block";
        let img = document.createElement('img');
        img.setAttribute("src", image.url);
        popup.appendChild(img);
        popup.style.display = "block";
        popup.addEventListener("click", () => {
            popup.style.display = "none";
        })
    }
    addImagetoLocalStorage = (star, image) => {
        console.log("ДОБАВЛЕНИЕ КАРТИНКИ В LOCALSTORAGE");
        if (localStorage.getItem(`${image.id}`) === null) {
            localStorage.setItem(`${image.id}`, JSON.stringify(image));
            star.setAttribute("src", "./star-enable.svg");
        } else {
            localStorage.removeItem(`${image.id}`);
            star.setAttribute("src", "./star-svg.svg");
        }
    }
    render(parent) {
        console.log(this.data);
        const usersBlock = this.generalCreateElement("div", "images");
        this.data.map(user => {
            const imageBlock = this.generalCreateElement("div", "image-block");
            let titleImage = this.popupText(user.title)
            const image = this.imageElement(user, titleImage, "150px")
            const star = this.starElement(user);

            titleImage.textContent = user.title;
            imageBlock.appendChild(star);
            imageBlock.appendChild(image);
            imageBlock.appendChild(titleImage);
            image.addEventListener("click", () => {
                this.showPopup(user);

            })
            usersBlock.appendChild(imageBlock);
        })
        parent.appendChild(usersBlock)
    }
}