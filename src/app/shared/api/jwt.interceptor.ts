import { Injectable }             from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService }          from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    constructor(private cookies: CookieService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.cookies.get('jwt');
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }
}
