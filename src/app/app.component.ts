import { Component }        from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }      from '@angular/forms';
import { RouterOutlet }     from '@angular/router';
import { PanelMenuModule }  from 'primeng/panelmenu';
import { MenuItem }         from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CreateOrEditPublicationComponent } from './shared/components/create-or-edit-publication/create-or-edit-publication.component';
import { AuthService } from './shared/api/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        HttpClientModule,
        FormsModule,
        RouterOutlet,
        PanelMenuModule,
        ButtonModule,
        DialogModule,
        CreateOrEditPublicationComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private authService: AuthService){}

    sideItems: MenuItem[] = [];

    ngOnInit() {
        const myId = this.authService.getUserIdFromToken();

        this.sideItems = [
        { label: 'Main',   icon: 'pi pi-home',   routerLink: ['/home']   },
        { label: 'Search', icon: 'pi pi-search', routerLink: ['/search'] },
        { 
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: ['/profile', myId]
        },
        {
            label: 'More',
            items: [
            { label: 'Settings', icon: 'pi pi-cog',  routerLink: ['/settings'] },
            { label: 'Help',     icon: 'pi pi-info', routerLink: ['/help']     }
            ]
        }
        ];
    }

    displayPostModal = false;

    openPostModal() {
        this.displayPostModal = true;
    }

    onPostSaved(pub: any) {
        this.displayPostModal = false;
    }
}