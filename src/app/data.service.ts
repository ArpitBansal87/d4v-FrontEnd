import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { loginModel } from './user-model-class';
import { userDetailsClass } from './user-details-model-class';
import { catchError, retry, map } from 'rxjs/operators';
import {LoginModelResponseClass} from './login-model-response-class';


import { Http, Headers, Request, RequestOptions } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  getUsers() {
    return this.http.get('http://localhost:3000/api/UsersDetails');
  }

  getUser(userId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId);
  }

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  loginUser(user:loginModel):Observable<any>{
    return this.http.post('http://localhost:3000/api/credentials/login',
     user, httpOptions).pipe(map(response => response));
  }

  registerUser(registerForm:any):Observable<any>{
    return this.http.post('http://localhost:3000/api/credentials',
    registerForm, httpOptions).pipe(map(response => response));
  }

  getCustomerDetails(user:LoginModelResponseClass):Observable<any>{
    return this.http.get('http://localhost:3000/api/credentials/'
        +user.userId+'?access_token='+user.id)
    .pipe(map(response => response));
  }

 }
