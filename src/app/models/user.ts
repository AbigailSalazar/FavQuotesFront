export class User{
    _id?:string;
    name: string;
    email: string;
    password?:string;
    photo?:string;

    constructor(name:string, email:string){
        this.name = name;
        this.email = email;
    }
}