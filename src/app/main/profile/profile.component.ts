import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PublicationComponent } from '../../shared/components/publication/publication.component';
import { ProfileDto, PublicationDto, PublicationServiceProxy } from '../../shared/api/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/api/auth.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, PublicationComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
    profile?: ProfileDto;
    publications: PublicationDto[] = [];
    showEditDialog = false;

    constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationServiceProxy,
    private authService: AuthService
    ) {}

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');

        if (!id) {
            id = this.authService.getUserIdFromToken();
        }

        if (!id) {
            return;
        }

        this.publicationService.getUserById(id)
        .subscribe(dto => this.profile = dto);

        this.publicationService.getByUserId(id)
        .subscribe(pubs => this.publications = pubs);
    }

    openEditDialog() {
        this.showEditDialog = true;
    }
    closeEditDialog() {
        this.showEditDialog = false;
    }
}
