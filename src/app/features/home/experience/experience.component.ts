import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, SectionComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent {
  private readonly contentService = inject(ContentService);
  
  protected experiences = toSignal(this.contentService.getExperience(), { initialValue: [] });
  protected expandedIndex = signal<number | null>(null);

  toggleExpand(index: number): void {
    this.expandedIndex.update(current => current === index ? null : index);
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  formatDate(dateString: string): string {
    if (dateString.toLowerCase() === 'present' || dateString.toLowerCase() === 'atual') {
      return 'Atual';
    }
    const [year, month] = dateString.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[Number.parseInt(month) - 1]} ${year}`;
  }

  scrollToProjects(projectIds: string[]): void {
    // Primeiro rola até a seção de projetos
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Após um pequeno delay, dispara evento customizado com os IDs dos projetos
      setTimeout(() => {
        const event = new CustomEvent('highlightProjects', { 
          detail: { projectIds }
        });
        globalThis.dispatchEvent(event);
      }, 500);
    }
  }
}
