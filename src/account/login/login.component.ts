import { Component }               from '@angular/core';
import { NgForm, FormsModule }     from '@angular/forms';
import { CommonModule }            from '@angular/common';
import { Router, RouterModule }    from '@angular/router';
import { InputTextModule }         from 'primeng/inputtext';
import { PasswordModule }          from 'primeng/password';
import { ButtonModule }            from 'primeng/button';
import { MessageModule }           from 'primeng/message';
import { CookieService }           from 'ngx-cookie-service';
import { AccountServiceProxy, LoginDto, AuthenticationResponse } from '../../app/shared/api/service-proxies';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputTextModule,
        PasswordModule,
        ButtonModule,
        MessageModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    model = {
        email:      '',
        password:   '',
        rememberMe: false
    };
    loading = false;
    error?: string;

    constructor(
        private api: AccountServiceProxy,
        private cookies: CookieService,
        private router: Router
    ) {}

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.loading = true;
        this.error = undefined;

        const dto = new LoginDto();
        dto.email    = this.model.email;
        dto.password = this.model.password;

        this.api.login(dto).subscribe({
            next: (resp: AuthenticationResponse) => {
                const opts: any = {
                    path: '/', secure: true, sameSite: 'Strict'
                };
                if (this.model.rememberMe) {
                    opts.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                }
                this.cookies.set('jwt', resp.token!, opts);
                this.cookies.set('refreshToken', resp.refreshToken!, opts);
                this.router.navigate(['/']);
            },
            error: err => {
                this.error = err.error?.detail || 'Login failed';
                this.loading = false;
            }
        });
    }
}