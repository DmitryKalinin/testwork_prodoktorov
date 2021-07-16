import { General } from "./General.js";
import { Users } from "./Users.js";
import { Images } from "./Images.js";

export class Menu extends General {

    render(parent) {
        const block = super.generalCreateElement("nav", "menu-block");
        const menu1 = super.generalCreateElement("a", "menu-item");
        const menu2 = super.generalCreateElement("a", "menu-item");
        menu1.textContent = this.data.menu1;
        menu2.textContent = this.data.menu2;
        menu1.addEventListener("click", async(e) => {
            this.show(parent, async() => {
                const users = new Users(await this.api.getUsers());
                users.render(parent);
            })
        })
        menu2.addEventListener("click", async(e) => {
            this.show(parent, async() => {
                const images = new Images(this.api.getFavorite());
                images.render(parent);
            })
        })
        block.appendChild(menu1);
        block.appendChild(menu2);
        parent.appendChild(block);
        return parent;
    }



}