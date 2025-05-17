import { Injectable }            from '@angular/core';
import { CanActivate, Router }   from '@angular/router';
import { CookieService }         from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private cookies: CookieService,
        private router: Router
    ) {}

    canActivate(): boolean {
        const token = this.cookies.get('jwt');
        if (token) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}