let catalog = document.getElementById("catalog");
let star = document.getElementById("star");
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
        let img = document.createElement("img");
        img.setAttribute("src", image.url);
        catalogImage.appendChild(img)
    })
}
document.getElementById("menu1").addEventListener("click", async() => {
    star.style.display = "none";
    catalog.style.display = "block"
    catalog.innerHTML = "";
    show();

})