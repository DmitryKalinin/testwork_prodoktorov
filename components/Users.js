import { General } from "./General.js";
import { Album } from "./Album.js"

export class Users extends General {


    render(parent) {
        console.log(this.data);
        const usersBlock = this.generalCreateElement("div", "users");
        this.data.map(user => {
            const userBlock = this.generalCreateElement("div", "user");
            const userName = this.generalCreateElement("h3", "user-name");
            userName.textContent = user.name;
            userBlock.appendChild(userName);
            userName.addEventListener("click", () => {
                this.show(userBlock, async() => {
                    const album = new Album(await this.api.getAlbums(user.id));
                    album.render(userBlock)
                })

            })
            usersBlock.appendChild(userBlock);
        })
        parent.appendChild(usersBlock)
    }
}