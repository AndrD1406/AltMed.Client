import { Component }        from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { RouterOutlet }     from '@angular/router';
import { PanelMenuModule }  from 'primeng/panelmenu';
import { MenuItem }         from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HttpClientModule,
        FormsModule,
        RouterOutlet,
        PanelMenuModule,
        ButtonModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    sideItems: MenuItem[] = [
        { label: 'Main',   icon: 'pi pi-home',   routerLink: '/home'   },
        { label: 'Search', icon: 'pi pi-search', routerLink: '/search' },
        { label: 'Profile',icon: 'pi pi-user',   routerLink: '/profile'},
        {
            label: 'More',
            items: [
                { label: 'Settings', icon: 'pi pi-cog',  routerLink: '/settings' },
                { label: 'Help',     icon: 'pi pi-info', routerLink: '/help'     }
            ]
        }
    ];

    openPostModal(){

    }
}