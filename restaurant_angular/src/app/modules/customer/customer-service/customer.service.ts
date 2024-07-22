import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { StorageService } from 'src/app/auth-service/storage-service/storage.service'; 

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + 'api/customer/categories', {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    if (token) {
      authHeaders = authHeaders.set('Authorization', 'Bearer ' + token);
    }
    return authHeaders;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); 
    return throwError('Something went wrong; please try again later.');
  }
  
}
