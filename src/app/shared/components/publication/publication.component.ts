import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PublicationDto } from '../../api/service-proxies';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-publication',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './publication.component.html',
    styleUrl: './publication.component.css'
})
export class PublicationComponent {
    @Input() publication!: PublicationDto;
    @Output() like = new EventEmitter<string>();
    @Output() comment = new EventEmitter<string>();

    defaultLogo = '/assets/default-logo.png';

    onLike() {
        this.like.emit(this.publication.id!);
    }

    onComment() {
        this.comment.emit(this.publication.id!);
    }
}