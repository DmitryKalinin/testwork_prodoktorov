//рендер меню в корневой блок.
import { API } from "./API.js";
import { Menu } from "./components/Menu.js";
const api = new API();
const root = document.getElementById("root");
api.getFavorite()
const menu = new Menu(api.getMenu());
menu.render(root);