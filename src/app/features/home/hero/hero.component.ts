import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent {
  private readonly contentService = inject(ContentService);
  
  protected profile = toSignal(this.contentService.getProfile());

  scrollToProjects(): void {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/cv/CV_Vinicius_Dias.pdf';
    link.download = 'CV_Vinicius_Dias.pdf';
    link.click();
  }
}
