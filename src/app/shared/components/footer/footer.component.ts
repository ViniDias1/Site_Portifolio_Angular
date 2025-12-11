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

  showCVOptions = false;

  downloadCV(format: 'pdf' | 'docx'): void {
    const fileMap = {
      pdf: '/curriculo - VINICIUS DIAS VALENCA.pdf',
      docx: '/curriculo - VINICIUS DIAS VALENCA'
    };
    const link = document.createElement('a');
    link.href = fileMap[format];
    link.download = fileMap[format].split('/').pop()!;
    link.click();
    this.showCVOptions = false;
  }

  viewCV(): void {
    window.open('/curriculo - VINICIUS DIAS VALENCA.pdf', '_blank');
    this.showCVOptions = false;
  }

  toggleCVOptions(): void {
    this.showCVOptions = !this.showCVOptions;
  }
}
