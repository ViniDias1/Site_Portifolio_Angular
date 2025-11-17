import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, SectionComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly contentService = inject(ContentService);
  
  protected profile = toSignal(this.contentService.getProfile());
  protected socialLinks = toSignal(this.contentService.getSocialLinks(), { initialValue: [] });
  protected emailCopied = signal(false);

  copyEmail(email: string): void {
    navigator.clipboard.writeText(email).then(() => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2000);
    });
  }
}
