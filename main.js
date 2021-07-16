import { API } from "./API.js";
import { Menu } from "./components/Menu.js";
const api = new API();
const root = document.getElementById("root");
api.getFavorite()
const menu = new Menu(api.getMenu());
menu.render(root);












/*
let catalog = document.getElementById("catalog");
let favorite = document.getElementById("favorite");
let popup = document.getElementById("popup");
let hiddenState = {
    catalog: false
}
let api = new API();
//--Запуск процедуры отрисовки имен--//
const main = async(url, func) => {
    show(await api.getUsers());
}

//------  Блок создания элементов ------//
//--звезда--//
const starElement = (image) => {
        let star = document.createElement("img");
        if (localStorage.getItem(`${image.id}`) === null) {
            star.setAttribute("src", "./star-svg.svg");
        } else {
            star.setAttribute("src", "./star-enable.svg");
        }
        star.setAttribute("width", "15px");
        star.classList.add("star");
        return star;
    }
    //--изображение--//
const imageElement = (image, width) => {
    let img = document.createElement("img");
    img.setAttribute("src", image.url);
    img.setAttribute("width", width);
    return img
}
const popupText = (text) => {
    let titleImage = document.createElement("span");
    titleImage.classList.add("popup-text");
    titleImage.textContent = text;
    return titleImage;
}

//------  Блок обработчиков событий ------//
//--добавление-удаление изображения из localStorage--//
const addImagetoLocalStorage = (star, image) => {
        console.log("ДОБАВЛЕНИЕ КАРТИНКИ В LOCALSTORAGE");
        if (localStorage.getItem(`${image.id}`) === null) {
            localStorage.setItem(`${image.id}`, JSON.stringify(image));
            star.setAttribute("src", "./star-enable.svg");
        } else {
            localStorage.removeItem(`${image.id}`);
            star.setAttribute("src", "./star-svg.svg");
        }
    }
    //--показ полноразмерного изображения--//
const showPopup = (image) => {
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
    //--процедура отрисовки имен, обработка клика и вызов отрисовки альбомов--//
const show = (data) => {
        hiddenState.catalog = !hiddenState.catalog;
        hiddenState.catalog ? catalog.style.display = "block" : catalog.style.display = "none";
        console.log(catalog.childNodes);
        data.map(el => {
            if (el.name && el.name !== undefined) {
                let catalogNewName = document.createElement('div');
                catalogNewName.classList.add("catalog-name");
                catalog.appendChild(catalogNewName);
                let newName = document.createElement("h2");
                newName.textContent = el.name;
                catalogNewName.appendChild(newName);
                newName.addEventListener("click", () => {
                    if (catalogNewName.childNodes.length > 1) {
                        for (let i = 1; i < catalogNewName.childNodes.length; i++) {
                            catalogNewName.childNodes[i].remove();
                        }
                    } else showAlbums(catalogNewName, newName, el.id);
                });
            }
        })
    }
    //--отрисовка названий альбомов, обработка клика и вызов отрисовки изображенеий--//
const showAlbums = async(catalog, element, id) => {
    let albums = await api.getAlbums(id);
    let catalogAlbum = document.createElement('div');
    catalogAlbum.classList.add("catalog-album");
    catalog.appendChild(catalogAlbum);
    console.log('КЛИК ПО ИМЕНИ');
    albums.map(alb => {
        let album = document.createElement('div');
        album.classList.add("album");
        catalogAlbum.appendChild(album);
        let albumTitle = document.createElement('h3');
        albumTitle.classList.add("album-title");
        albumTitle.innerHTML = alb.title;
        album.appendChild(albumTitle);
        albumTitle.addEventListener("click", () => {
            if (album.childNodes.length > 1) {
                for (let i = 1; i < album.childNodes.length; i++) {
                    album.childNodes[i].remove();
                }
            } else showImage(album, albumTitle, alb.id)
        });

    })
}

//--отрисовка изображений, обработки кликов по изображению и звезде--//
const showImage = async(catalog, element, id) => {
    let images = await api.getImages(id);
    //console.log(images);
    console.log('КЛИК ПО АЛЬБОМУ ');
    let catalogImages = document.createElement('div');
    catalogImages.classList.add("catalog-images");
    catalog.appendChild(catalogImages);
    images.map(image => {
        let imageItem = document.createElement('div');
        imageItem.classList.add("image-item");
        catalogImages.appendChild(imageItem);
        let star = starElement(image);
        let img = imageElement(image, "150px");
        let titleImage = popupText(image.title)
        imageItem.appendChild(star)
        imageItem.appendChild(img)
        imageItem.appendChild(titleImage)

        img.addEventListener("click", () => {
            showPopup(image)
        })
        img.addEventListener("mouseover", () => {
            titleImage.style.display = "block";
            img.addEventListener("mouseout", () => {
                titleImage.style.display = "none";
            })

        })
        star.addEventListener("click", () => {
            addImagetoLocalStorage(star, image);
        })

    })
}

//--показ добавленных в избранное-localStorage изображений--//
const showFavorite = () => {
    favorite.innerHTML = '';
    let keys = Object.keys(localStorage);
    keys.map(item => {
        let image = JSON.parse(localStorage.getItem(item))
        let catalogImage = document.createElement('div');
        catalogImage.classList.add("image-item");
        favorite.appendChild(catalogImage);
        let star = starElement(image);
        let img = imageElement(image, "150px");
        catalogImage.appendChild(star);
        catalogImage.appendChild(img);
        img.addEventListener("click", () => { showPopup(image) })
        star.addEventListener("click", () => {
            addImagetoLocalStorage(star, image);
            showFavorite();
        })
    })
}

//--обработка кнопок меню--//
document.getElementById("menu1").addEventListener("click", async() => {
    favorite.style.display = "none";
    catalog.style.display = "block"
    catalog.innerHTML = "";
    main();

})
document.getElementById("menu2").addEventListener("click", async() => {
    favorite.style.display = "block";
    catalog.style.display = "none"
    hiddenState.catalog = false;
    favorite.innerHTML = "";
    showFavorite();
})*/