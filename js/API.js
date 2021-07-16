//Класс api для загрузки данных
export class API {

    getFavorite() {
        let response = [];
        let keys = Object.keys(localStorage);
        keys.map(item => {
            response.push(JSON.parse(localStorage.getItem(item)))
        })

        return response;
    }
    getMenu() {
        return { menu1: "Каталог", menu2: "Избранное" };
    }

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