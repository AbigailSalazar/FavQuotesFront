import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  url="https://api-fav-quotes.netlify.app/api/groups"
  constructor(private http: HttpClient) { }

  getGroups():Observable<any>{
    return this.http.get(this.url)
  }

  getGroup(groupName:string):Observable<any>{
    return this.http.get(this.url + "/" + groupName)
  }

  addQuote(groupId:string,quoteId:string){
    return this.http.patch(this.url+"/"+groupId+"/quotes",{quote:quoteId})
  }

  deleteQuote(groupId:string,quoteId:string){
    return this.http.delete(this.url+"/"+groupId+"quote",{body:quoteId})
  }
}
