import { bootstrapApplication }                   from '@angular/platform-browser';
import { AppComponent }                            from './app/app.component';
import { provideRouter }                           from '@angular/router';
import { provideHttpClient }                       from '@angular/common/http';
import { provideAnimations }                       from '@angular/platform-browser/animations';
import { providePrimeNG }                          from 'primeng/config';
import { CookieService }                           from 'ngx-cookie-service';
import Aura from '@primeng/themes/aura';
import { routes }                                  from './app/app.routes';
import { HTTP_INTERCEPTORS }                       from '@angular/common/http';
import { JwtInterceptor } from './app/shared/api/Jwt.Interceptor';
import { environment } from './environments/environment';
import { API_BASE_URL } from './app/shared/api/service-proxies';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(),              // makes HttpClient available
        { provide: API_BASE_URL, useValue: environment.apiBaseUrl },
        provideAnimations(),
        providePrimeNG({ theme: { preset: Aura } }),
        CookieService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
})