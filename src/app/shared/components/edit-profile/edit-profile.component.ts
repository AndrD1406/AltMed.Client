import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AccountServiceProxy, EditProfileDto, ProfileDto, PublicationServiceProxy } from '../../api/service-proxies';

@Component({
    selector: 'edit-profile',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        MessageModule
    ],
    templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent {
    @Input() model: EditProfileDto = new EditProfileDto();
    @Output() saved     = new EventEmitter<ProfileDto>();
    @Output() cancelled = new EventEmitter<void>();

    previewUrl: string | ArrayBuffer | null = null;
    loading = false;
    error?: string;

    constructor(private accountService: AccountServiceProxy) {}

    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;
        this.loadFile(input.files[0]);
    }

    onPaste(event: ClipboardEvent) {
        const items = event.clipboardData?.items;
        if (!items) return;
        for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
            this.loadFile(file);
            event.preventDefault();
            }
            break;
        }
        }
    }

    private loadFile(file: File) {
        const maxPx = 1024; // or whatever limit you want

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            const img = new Image();
            img.onload = () => {
            if (img.naturalWidth > maxPx || img.naturalHeight > maxPx) {
                this.error = `Image must be at most ${maxPx}px × ${maxPx}px.`;
                this.previewUrl = null;
                this.model.logo = undefined;
            } else {
                this.error = undefined;
                this.previewUrl = dataUrl;
                this.model.logo = dataUrl.split(',')[1];
            }
            };
            img.onerror = () => {
            this.error = 'Invalid image file.';
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
        }

    clearImage() {
        this.previewUrl = null;
        this.model.logo = undefined;
    }

    onSubmit(form: NgForm) {
        if (form.invalid) return;
        this.loading = true;
        this.error   = undefined;

        this.accountService.editProfile(this.model)
        .subscribe({
            next: updated => {
            this.loading = false;
            this.saved.emit(updated);
            },
            error: err => {
            this.loading = false;
            this.error = err.error?.detail || 'Update failed';
            }
        });
    }

    onCancel() {
        this.cancelled.emit();
    }
}
