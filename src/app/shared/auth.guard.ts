import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../pages/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Cho phép truy cập
    } else {
      //clear token
      localStorage.removeItem('token');
      this.router.navigate(['/login']); // Chuyển hướng đến trang đăng nhập
      return false; // Không cho phép truy cập
    }
  }
}
