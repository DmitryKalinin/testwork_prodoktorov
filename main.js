let catalog = document.getElementById("catalog");
let favorite = document.getElementById("favorite");
let popup = document.getElementById("popup");


const mainfunc = async(url, func) => {
    let data;
    let response = await fetch(url);
    let res = await response.json().then(res => { data = res });
    func(data);
}

const main = () => {
    mainfunc("https://json.medrating.org/users/", show)
}
const show = (data) => {
        data.map(el => {
            //console.log(el);

            if (el.name !== undefined) {
                let catalogNewName = document.createElement('div');
                catalogNewName.classList.add("catalog-name");
                catalog.appendChild(catalogNewName);
                let newName = document.createElement("h2");
                newName.textContent = el.name;
                catalogNewName.appendChild(newName)

                newName.addEventListener("click", () => {
                    showAlbums(catalogNewName, newName, el.id);
                });
            }
        })
    }
    /*const show = async() => {
        let a = await fetch("https://json.medrating.org/users/");
        let response = await a.json();
        //console.log(response);
        console.log('КЛИК ПО КАТАЛОГУ');
        response.map(el => {
            //console.log(el);

            if (el.name !== undefined) {
                let catalogNewName = document.createElement('div');
                catalogNewName.classList.add("catalog-name");
                catalog.appendChild(catalogNewName);
                let newName = document.createElement("h2");
                newName.textContent = el.name;
                catalogNewName.appendChild(newName)

                newName.addEventListener("click", () => {
                    showAlbums(catalogNewName, newName, el.id);
                });
            }
        })
    }*/
const showAlbums = async(catalog, element, id) => {
    let response = await fetch(`https://json.medrating.org/albums?userId=${id}`);
    let albums = await response.json();
    console.log('КЛИК ПО ИМЕНИ');
    albums.map(alb => {
        let catalogAlbum = document.createElement('div');
        catalogAlbum.classList.add("catalog-album");
        catalog.appendChild(catalogAlbum);
        let albumTitle = document.createElement('h3');
        albumTitle.classList.add("album-title");
        albumTitle.innerHTML = alb.title;
        catalogAlbum.appendChild(albumTitle);
        albumTitle.addEventListener("click", () => { showImage(catalogAlbum, albumTitle, alb.id) })
    })

}
const showImage = async(catalog, element, id) => {

    let response = await fetch(`https://json.medrating.org/photos?albumId=${id}`);
    let images = await response.json();
    //console.log(images);
    console.log('КЛИК ПО АЛЬБОМУ ');
    images.map(image => {
        let catalogImage = document.createElement('div');
        catalogImage.classList.add("catalog-image");
        catalog.appendChild(catalogImage);
        let star = document.createElement("img");
        if (localStorage.getItem(`${image.id}`) === null) {
            star.setAttribute("src", "./star-svg.svg");
        } else {
            star.setAttribute("src", "./star-enable.svg");
        }
        star.setAttribute("width", "15px");
        star.classList.add("star");
        let img = document.createElement("img");
        img.setAttribute("src", image.url);
        img.setAttribute("width", "150px");
        catalogImage.appendChild(star)
        catalogImage.appendChild(img)

        img.addEventListener("click", () => {
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
        })
        img.addEventListener("mousemove", () => {
            console.log("НАВЕДЕНИЕ НА КАРТИНКУ");

        })
        star.addEventListener("click", () => {
            console.log("ДОБАВЛЕНИЕ КАРТИНКИ В LOCALSTORAGE");
            if (localStorage.getItem(`${image.id}`) === null) {
                localStorage.setItem(`${image.id}`, JSON.stringify(image));
                star.setAttribute("src", "./star-enable.svg");
            } else {
                localStorage.removeItem(`${image.id}`);
                star.setAttribute("src", "./star-svg.svg");
            }
        })
    })
}

const showFavorite = () => {
    let keys = Object.keys(localStorage);
    keys.map(item => {
        let image = JSON.parse(localStorage.getItem(item))
        console.log(typeof image);
        let catalogImage = document.createElement('div');
        catalogImage.classList.add("catalog-image");
        favorite.appendChild(catalogImage);
        let star = document.createElement("img");
        if (localStorage.getItem(`${image.id}`) === null) {
            star.setAttribute("src", "./star-svg.svg");
        } else {
            star.setAttribute("src", "./star-enable.svg");
        }
        star.setAttribute("width", "15px");
        star.classList.add("star");
        let img = document.createElement("img");
        img.setAttribute("src", image.url);
        img.setAttribute("width", "150px");
        catalogImage.appendChild(star)
        catalogImage.appendChild(img)

        star.addEventListener("click", () => {
            console.log("ДОБАВЛЕНИЕ КАРТИНКИ В LOCALSTORAGE");
            if (localStorage.getItem(`${image.id}`) === null) {
                localStorage.setItem(`${image.id}`, JSON.stringify(image));
                star.setAttribute("src", "./star-enable.svg");
            } else {
                localStorage.removeItem(`${image.id}`);
                star.setAttribute("src", "./star-svg.svg");
            }
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
    favorite.innerHTML = "";
    showFavorite();

})