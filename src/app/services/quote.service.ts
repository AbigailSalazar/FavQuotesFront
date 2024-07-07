import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Quote } from '../models/quote';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  url="https://api-fav-quotes.netlify.app/api/quotes"
  constructor(private http: HttpClient, private _userService:UserService) { }

  getQuoteByAuthor(authorName:string):Observable<any>{
    return this.http.get(this.url + "/author",{params:  new HttpParams().set('person', authorName)})
  }

  getQuotesLikedByUser(userId:string):Observable<any>{
    return this.http.get(this.url+"/liked/"+userId)
    .pipe(
      catchError(this.handleError)
    );
  }

  addQuote(quote:Quote){
    const token=this._userService.getToken()
    return this.http.post(this.url+"/",quote)
    .pipe(
      catchError(this.handleError)
    );
  }

  likeQuote(quoteId:string){
    return this.http.patch(this.url+"/"+quoteId+"/like",{body:""})
    .pipe(
      catchError(this.handleError)
    );
  }

  unLikeQuote(quoteId:string){
    return this.http.patch(this.url+"/"+quoteId+"/unlike",{body:""})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteQuote(quoteId:string){
    return this.http.delete(this.url+"/"+quoteId)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 403) {
      this._userService.logout()
    }
    else if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
