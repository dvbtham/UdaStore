import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AppConfig } from '../app-config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { UserProfile } from '../../models/core/user';
import { ToastyService } from 'ng2-toasty';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public isLoggedIn = localStorage.getItem("currentUser") || false;
  public fullname = "unnamed";

  constructor(private http: Http, private toastyService: ToastyService, private router: Router) { }
  login(username: string, password: string) {
    return this.http.post('/api/users/token', { username: username, password: password })
      .map((response: Response) => {
        
        let user = response.json();
        
        if (user && user.token) {
          if (user.roles.some(r => r == "admin") || user.roles.some(r => r == "vendor")) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isLoggedIn = true;
          }
          else {
            this.isLoggedIn = false;
            this.toastyService.error({
              title: 'Lỗi',
              msg: 'Không có quyền truy cập.',
              theme: 'material',
              timeout: 5000,
              showClose: true
            })
          }
        }
      });
  }

  public logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
