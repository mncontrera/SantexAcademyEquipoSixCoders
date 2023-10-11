import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    private cookieService: CookieService, private router: Router
  ){}

  redirect(flag:boolean) {
    if(!flag) {
      this.router.navigate(['/user', 'login']);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookieToken = this.cookieService.check('tokenDeAcceso');
      this.redirect(cookieToken);
    return cookieToken;
  }

}
