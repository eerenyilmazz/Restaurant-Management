import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/app/auth-service/storage-service/storage.service';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCategory(categoryDto: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/category', categoryDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategoriesByTitle(title: string): Observable<any> {
    return this.http.get(BASE_URL + `api/admin/categories/${title}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  postProduct(categoryId: number, productDto: any): Observable<any> {
    return this.http.post(BASE_URL + `api/admin/${categoryId}/product`, productDto, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(BASE_URL + `api/admin/${categoryId}/products`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getProductsByCategoryAndTitle(categoryId: number, title: string): Observable<any> {
    return this.http.get(BASE_URL + `api/admin/${categoryId}/product/${title}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(BASE_URL + `api/admin/product/${productId}`, {
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
