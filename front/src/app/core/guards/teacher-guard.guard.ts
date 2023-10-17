import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuardGuard implements CanActivate, CanActivateChild {
  constructor(
    private cookieService: CookieService, private router: Router
  ){}

  redirect(flag:any) {
    if(!flag) {
      this.router.navigate(['/user', 'edit-profile']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userRole = localStorage.getItem('currentUserRole');
      let result:boolean = false;
      if(userRole === '2') {
        result = true;
      }
      this.redirect(userRole);
    return result;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
