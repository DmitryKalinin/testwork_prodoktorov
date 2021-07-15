import { API } from "../API.js";
import { General } from "./General.js";
import { Users } from "./Users.js";
const api = new API();
export class Menu extends General {

    render(parent) {
        const block = super.generalCreateElement("nav", "menu-block");
        const menu1 = super.generalCreateElement("a", "menu-item");
        const menu2 = super.generalCreateElement("a", "menu-item");
        menu1.textContent = this.data.menu1;
        menu2.textContent = this.data.menu2;
        menu1.addEventListener("click", async(e) => {
            const users = new Users(await api.getUsers());
            users.render(e.target);
        })
        menu2.addEventListener("click", async(e) => {
            const images = new Images(api.getFavorite);
        })


        block.appendChild(menu1);
        block.appendChild(menu2);
        parent.appendChild(block);
        return parent;
    }



}