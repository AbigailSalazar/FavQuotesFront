import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url="https://api-fav-quotes.netlify.app/api/users"
  isBrowser: boolean;
  constructor(private http: HttpClient,  @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
   }

  signUp(user:User):Observable<any>{
    return this.http.post(this.url, user)
  }

  login(email:string,password:string):Observable<any>{
    return this.http.post(this.url + "/authentication", {
      email:email,
      password:password
    });
  }

  logout(){
    if(this.isBrowser){
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }

  getUser(){
    if(this.isBrowser){
      return localStorage.getItem("user");
    }
    return null;
  }

  getToken(){
    if(this.isBrowser){
      return localStorage.getItem("token");
    }
    return null;
  }
}
