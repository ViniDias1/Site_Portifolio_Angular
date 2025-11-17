import { Component, inject, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ContentService } from '../../../core/services/content.service';
import { IMusicRelease } from '../../../core/models/portfolio.models';

type TabType = 'developer' | 'artist';
type DeveloperSubTab = 'profile' | 'education' | 'certificates';

@Component({
  selector: 'app-about',
  imports: [CommonModule, SectionComponent, ButtonComponent, ModalComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, OnDestroy {
  private readonly contentService = inject(ContentService);
  private tabChangeListener?: EventListener;
  
  protected profile = toSignal(this.contentService.getProfile());
  protected musicProfile = toSignal(this.contentService.getMusicProfile());
  protected musicReleases = toSignal(this.contentService.getMusicReleases());
  protected education = toSignal(this.contentService.getEducation());
  protected certificates = toSignal(this.contentService.getCertificates());
  
  protected activeTab = signal<TabType>('developer');
  protected activeDeveloperSubTab = signal<DeveloperSubTab>('profile');
  protected selectedRelease = signal<IMusicRelease | null>(null);
  protected isReleaseModalOpen = signal(false);

  ngOnInit(): void {
    this.tabChangeListener = ((event: CustomEvent) => {
      const tab = event.detail?.tab;
      if (tab === 'developer' || tab === 'artist') {
        this.setActiveTab(tab);
      }
    }) as EventListener;

    globalThis.addEventListener('aboutTabChange', this.tabChangeListener);
  }

  ngOnDestroy(): void {
    if (this.tabChangeListener) {
      globalThis.removeEventListener('aboutTabChange', this.tabChangeListener);
    }
  }

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  setDeveloperSubTab(subTab: DeveloperSubTab): void {
    this.activeDeveloperSubTab.set(subTab);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = '/assets/cv/CV_Vinicius_Dias.pdf';
    link.download = 'CV_Vinicius_Dias.pdf';
    link.click();
  }

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openLink(url?: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  getReleaseBadgeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'single': 'badge-single',
      'ep': 'badge-ep',
      'album': 'badge-album'
    };
    return classes[type] || 'badge-single';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
  }

  openReleaseModal(release: IMusicRelease): void {
    this.selectedRelease.set(release);
    this.isReleaseModalOpen.set(true);
  }

  closeReleaseModal(): void {
    this.isReleaseModalOpen.set(false);
    setTimeout(() => this.selectedRelease.set(null), 300);
  }

  getTotalDuration(tracklist?: { duration: string }[]): string {
    if (!tracklist || tracklist.length === 0) return '';
    
    let totalSeconds = 0;
    for (const track of tracklist) {
      const [mins, secs] = track.duration.split(':').map(Number);
      totalSeconds += mins * 60 + secs;
    }
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
