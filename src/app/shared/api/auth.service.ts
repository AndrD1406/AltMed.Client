// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from './service-proxies';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private http: HttpClient,
        private cookies: CookieService
    ) {}

    refresh(): Observable<AuthenticationResponse> {
        const token        = this.cookies.get('jwt');
        const refreshToken = this.cookies.get('refreshToken');
        return this.http.post<AuthenticationResponse>(
            `https://localhost:7019/api/Account/refresh`,
            { token, refreshToken },
            { withCredentials: true }
        );
    }

    storeTokens(resp: AuthenticationResponse, rememberMe: boolean) {
        const expiry = rememberMe
        ? new Date(Date.now() + 7*24*60*60*1000)
        : undefined;
        // set jwt
        this.cookies.set('jwt', resp.token!, expiry, '/', undefined, false, 'Strict');
        // set refreshToken
        this.cookies.set('refreshToken', resp.refreshToken!, expiry, '/', undefined, false, 'Strict');
    }

    getRememberMe(): boolean {
    return localStorage.getItem('rememberMe') === 'true';
    }

    setRememberMe(flag: boolean) {
    localStorage.setItem('rememberMe', flag ? 'true' : 'false');
    }
}
