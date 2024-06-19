import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveToken(token: string): void {
    window.localStorage.setItem(TOKEN, token);
  }

  saveUser(user: any): void {
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  static isAdminLoggedIn(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }
}
