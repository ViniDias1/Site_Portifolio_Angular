import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ContentService } from '../../../core/services/content.service';
import { IProject } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, SectionComponent, ModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private readonly contentService = inject(ContentService);
  private highlightListener?: EventListener;
  
  protected projects = toSignal(this.contentService.getProjects(), { initialValue: [] });
  protected selectedProject = signal<IProject | null>(null);
  protected isModalOpen = signal(false);
  protected currentImageIndex = signal(0);
  protected selectedFilter = signal<string>('Todos');
  protected highlightedProjectIds = signal<string[]>([]);
  protected participantWarningId = signal<string>('');

  protected filters = ['Todos', 'Públicos', 'Privados'] as const;

  protected filteredProjects = computed(() => {
    const filter = this.selectedFilter();
    const allProjects = this.projects();
    
    if (filter === 'Todos') {
      return allProjects;
    } else if (filter === 'Públicos') {
      return allProjects.filter(project => project.isPublic === true);
    } else {
      return allProjects.filter(project => project.isPublic === false);
    }
  });

  ngOnInit(): void {
    this.highlightListener = ((event: CustomEvent) => {
      const projectIds = event.detail?.projectIds;
      if (projectIds && Array.isArray(projectIds)) {
        this.highlightedProjectIds.set(projectIds);
        // Remove o destaque após 3 segundos
        setTimeout(() => {
          this.highlightedProjectIds.set([]);
        }, 3000);
      }
    }) as EventListener;

    globalThis.addEventListener('highlightProjects', this.highlightListener);
  }

  ngOnDestroy(): void {
    if (this.highlightListener) {
      globalThis.removeEventListener('highlightProjects', this.highlightListener);
    }
  }

  isHighlighted(projectId: string): boolean {
    return this.highlightedProjectIds().includes(projectId);
  }

  selectFilter(filter: string): void {
    this.selectedFilter.set(filter);
  }

  openProject(project: IProject): void {
    this.selectedProject.set(project);
    this.currentImageIndex.set(0);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedProject.set(null);
  }

  nextImage(): void {
    const project = this.selectedProject();
    if (project && project.images.length > 0) {
      this.currentImageIndex.update(index => 
        (index + 1) % project.images.length
      );
    }
  }

  prevImage(): void {
    const project = this.selectedProject();
    if (project && project.images.length > 0) {
      this.currentImageIndex.update(index => 
        index === 0 ? project.images.length - 1 : index - 1
      );
    }
  }

  get currentImage(): string {
    const project = this.selectedProject();
    return project?.images[this.currentImageIndex()] || '';
  }

  getStatusLabel(status?: 'completed' | 'in-progress' | 'planned'): string {
    const labels = {
      'completed': 'Finalizado',
      'in-progress': 'Em Andamento',
      'planned': 'Planejado'
    };
    return status ? labels[status] : '';
  }

  getStatusIcon(status?: 'completed' | 'in-progress' | 'planned'): string {
    const icons = {
      'completed': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'in-progress': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      'planned': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    };
    return status ? icons[status] : '';
  }

  handleParticipantClick(event: Event, githubUrl: string, participantName: string): void {
    if (!githubUrl || githubUrl.trim() === '') {
      event.preventDefault();
      const participantId = `${participantName}-${Date.now()}`;
      this.participantWarningId.set(participantId);
      setTimeout(() => {
        this.participantWarningId.set('');
      }, 2000);
    }
  }
}
