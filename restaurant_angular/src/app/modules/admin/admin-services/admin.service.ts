import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/app/auth-service/storage-service/storage.service';

const BASE_URL = ["http://localhost:8080/"];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASE_URL + "api/admin/category", categoryDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    console.log("Token:", token); 
    if (token) {
      authHeaders = authHeaders.set("Authorization", "Bearer " + token);
    }
    console.log("Headers:", authHeaders); 
    return authHeaders;
  }

  private handleError(error: HttpErrorResponse) {
    console.error("An error occurred:", error); 
    return throwError('Something went wrong; please try again later.');
  }
}
