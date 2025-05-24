import { Component } from '@angular/core';
import { PublicationsContainerComponent } from "../../shared/components/publications-container/publications-container.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [PublicationsContainerComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
