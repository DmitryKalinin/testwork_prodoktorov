let catalog = document.getElementById("catalog");
let favorite = document.getElementById("favorite");
let popup = document.getElementById("popup");
let hiddenState = {
    catalog: false,
    name: false,
    albums: false,
}
const getData = async(url, func) => {
    let data;
    let response = await fetch(url);
    await response.json().then(res => { data = res });
    func(data);
}

const main = () => {
        getData("https://json.medrating.org/users/", show);
    }
    //------  Блок создания элементов ------//
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
const imageElement = (image, width) => {
    let img = document.createElement("img");
    img.setAttribute("src", image.url);
    img.setAttribute("width", width);
    return img
}

//------  Блок обработчиков событий ------//
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
            newName.addEventListener("click", () => { showAlbums(catalogNewName, newName, el.id) });
        }
    })
}

const showAlbums = async(catalog, element, id) => {
    hiddenState.albums = !hiddenState.albums;
    let response = await fetch(`https://json.medrating.org/albums?userId=${id}`);
    let albums = await response.json();
    let catalogAlbum = document.createElement('div');
    catalogAlbum.classList.add("catalog-album");
    catalog.appendChild(catalogAlbum);
    console.log('КЛИК ПО ИМЕНИ');
    hiddenState.albums === false ? catalog.remove() :
        albums.map(alb => {
            let album = document.createElement('div');
            album.classList.add("album");
            catalogAlbum.appendChild(album);
            let albumTitle = document.createElement('h3');
            albumTitle.classList.add("album-title");
            albumTitle.innerHTML = alb.title;
            album.appendChild(albumTitle);
            albumTitle.addEventListener("click", () => { showImage(album, albumTitle, alb.id) });
        })
}
const showImage = async(catalog, element, id) => {

    let response = await fetch(`https://json.medrating.org/photos?albumId=${id}`);
    let images = await response.json();
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
        imageItem.appendChild(star)
        imageItem.appendChild(img)

        img.addEventListener("click", () => {
            showPopup(image)
        })
        img.addEventListener("mousemove", () => {
            console.log("НАВЕДЕНИЕ НА КАРТИНКУ");
        })
        star.addEventListener("click", () => {
            addImagetoLocalStorage(star, image);
        })
    })
}

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
})