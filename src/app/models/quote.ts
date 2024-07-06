export class Quote{
    _id?:string;
    user:string;
    person:string;
    quote:string;
    likes:[]

    constructor(user:string,person:string,quote:string,likes:[]) {
        this.user=user;
        this.person=person;
        this.quote=quote;
        this.likes=likes;
    }
}