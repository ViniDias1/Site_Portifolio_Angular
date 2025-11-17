import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly contentService = inject(ContentService);
  
  protected readonly currentYear = new Date().getFullYear();
  protected socialLinks$ = this.contentService.getSocialLinks();

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/cv/CV_Vinicius_Dias.pdf';
    link.download = 'CV_Vinicius_Dias.pdf';
    link.click();
  }

  openCV(): void {
    window.open('/assets/cv/CV_Vinicius_Dias.pdf', '_blank');
  }
}
