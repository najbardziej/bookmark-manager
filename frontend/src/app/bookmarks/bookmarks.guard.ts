import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/signin']);
    }
    return true;
  }

}
