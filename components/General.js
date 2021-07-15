export class General {

    constructor(data) {
        this.data = data;
    }

    generalCreateElement(type, className) {
        let element = document.createElement(type);
        element.classList.add(className);
        return element;
    }
    render() {}
}