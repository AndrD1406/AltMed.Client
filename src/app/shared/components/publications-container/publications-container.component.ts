import { Component, OnInit } from '@angular/core';
import { PublicationDto, PublicationServiceProxy } from '../../api/service-proxies';
import { PublicationComponent } from "../publication/publication.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'publications-container',
    standalone: true,
    imports: [PublicationComponent, CommonModule],
    templateUrl: './publications-container.component.html',
    styleUrl: './publications-container.component.css'
})
export class PublicationsContainerComponent implements OnInit {
    publications: PublicationDto[] = [];

    constructor(private publicationService: PublicationServiceProxy) { }

    ngOnInit(): void {
    this.publicationService.getWithDetails()
        .subscribe(result => {
        result.forEach(pub => {
            pub.likes = (pub.likes || []).filter(l => l.isLiked);
        });
        this.publications = result;
        });
    }

    handleLike(pubId: string) {
        const publication = this.publications.find(p => p.id === pubId)!;

        this.publicationService.like(pubId).subscribe(likeDto => {
            publication.likes = publication.likes || [];

            const idx = publication.likes.findIndex(l => l.id === likeDto.id);
            if (idx > -1) {
            publication.likes[idx] = likeDto;
            } else {
            publication.likes.push(likeDto);
            }

            publication.likes = publication.likes.filter(l => l.isLiked);
        });
    }

    handleComment(pubId: string) {
        
    }
}
