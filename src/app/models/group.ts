import { Quote } from "./quote";

export class Group{
    _id?:string;
    name: string;
    photo? : string;
    quotes?: Quote[]

    constructor(name:string) {
        this.name = name;
    }
} 