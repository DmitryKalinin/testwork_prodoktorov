let catalog = document.getElementById("catalog");
let favorite = document.getElementById("favorite");
const show = async() => {
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
}
var showAlbums = async(catalog, element, id) => {
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
let showImage = async(catalog, element, id) => {

    let response = await fetch(`https://json.medrating.org/photos?albumId=${id}`);
    let images = await response.json();
    //console.log(images);
    console.log('КЛИК ПО АЛЬБОМУ ');
    images.map(image => {
        let catalogImage = document.createElement('div');
        catalogImage.classList.add("catalog-image");
        catalog.appendChild(catalogImage);
        let star = document.createElement("img");
        star.setAttribute("src", "./star-svg.svg");
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
    show();

})