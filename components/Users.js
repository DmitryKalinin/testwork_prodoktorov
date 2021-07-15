import { General } from "./General.js";

export class Users extends General {


    render() {
        this.data.map(user => {
            console.log(user);
        })
    }
}