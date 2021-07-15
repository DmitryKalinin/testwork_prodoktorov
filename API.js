export class API {

    getFavorite = Object.keys(localStorage);
    getMenu = { menu1: "Каталог", menu2: "Избранное" };

    async getUsers() {
        let response = await fetch("https://json.medrating.org/users/");
        let json = response.ok ? await response.json() : "Ошибка HTTP: " + response.status;
        return json;
    }
    async getAlbums(id) {
        let response = await fetch(`https://json.medrating.org/albums?userId=${id}`);
        let json = response.ok ? await response.json() : "Ошибка HTTP: " + response.status;
        return json;
    }
    async getImages(id) {
        let response = await fetch(`https://json.medrating.org/photos?albumId=${id}`);
        let json = response.ok ? await response.json() : "Ошибка HTTP: " + response.status;
        return json;
    }
}