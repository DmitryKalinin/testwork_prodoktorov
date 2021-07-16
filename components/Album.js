import { General } from "./General.js"
import { Images } from "./Images.js"
export class Album extends General {

    // let albumTitle= super.generalCreateElement("h3","album-title");


    render(parent) {
        console.log(this.data);
        const usersBlock = this.generalCreateElement("div", "albums");
        this.data.map(user => {
            const userBlock = this.generalCreateElement("div", "album");
            const albumName = this.generalCreateElement("h4", "album-name");
            albumName.textContent = user.title;
            userBlock.appendChild(albumName);
            albumName.addEventListener("click", () => {
                this.show(userBlock, async() => {
                    const images = new Images(await this.api.getImages(user.id));
                    images.render(userBlock)
                })

            })
            usersBlock.appendChild(userBlock);
        })
        parent.appendChild(usersBlock)
    }

}