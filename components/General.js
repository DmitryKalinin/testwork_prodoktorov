import { API } from "../API.js";
const api = new API();
export class General {

    constructor(data) {
        this.data = data;
        this.api = api;
    }

    generalCreateElement(type, className) {
        let element = document.createElement(type);
        element.classList.add(className);
        return element;
    }
    show(element, func) {
        if (element.childNodes.length > 1) {
            for (let i = 1; i < element.childNodes.length; i++) {
                element.childNodes[i].remove();
            }
        } else func();
    }
    render() {}
}