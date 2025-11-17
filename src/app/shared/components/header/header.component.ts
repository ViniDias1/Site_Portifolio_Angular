import { Component, signal, inject, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private readonly themeService = inject(ThemeService);
  private scrollListener?: () => void;
  private dropdownTimeout?: ReturnType<typeof setTimeout>;
  
  protected isMenuOpen = signal(false);
  protected theme = this.themeService.theme;
  protected activeSection = signal<string>('home');
  protected indicatorStyle = signal({ left: '0px', width: '0px' });
  protected showAboutDropdown = signal(false);
  
  protected readonly menuItems = [
    { label: 'Início', anchor: 'home' },
    { label: 'Sobre', anchor: 'about', hasDropdown: true },
    { label: 'Habilidades', anchor: 'skills' },
    { label: 'Experiência', anchor: 'experience' },
    { label: 'Projetos', anchor: 'projects' },
    { label: 'Contato', anchor: 'contact' }
  ];

  protected readonly aboutDropdownItems = [
    { label: 'Desenvolvedor', anchor: 'about', tab: 'developer' },
    { label: 'Artista', anchor: 'about', tab: 'artist' }
  ];

  ngAfterViewInit(): void {
    // Aguardar próximo tick para garantir que DOM está renderizado
    setTimeout(() => {
      this.updateIndicatorPosition();
      this.setupScrollListener();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
  }

  private setupScrollListener(): void {
    this.scrollListener = () => {
      this.updateActiveSection();
    };
    window.addEventListener('scroll', this.scrollListener, { passive: true });
    
    // Verificar posição inicial
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = this.menuItems.map(item => ({
      anchor: item.anchor,
      element: document.getElementById(item.anchor)
    })).filter(item => item.element !== null);

    const scrollPosition = window.scrollY + 100; // Offset para ativar um pouco antes

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.element) {
        const offsetTop = section.element.offsetTop;
        if (scrollPosition >= offsetTop) {
          if (this.activeSection() !== section.anchor) {
            this.activeSection.set(section.anchor);
            this.updateIndicatorPosition();
          }
          break;
        }
      }
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  scrollToSection(anchor: string, tab?: string): void {
    this.closeMenu();
    this.showAboutDropdown.set(false);
    this.activeSection.set(anchor);
    this.updateIndicatorPosition();
    
    // Se for seção about com tab específica, disparar evento customizado
    if (anchor === 'about' && tab) {
      globalThis.dispatchEvent(new CustomEvent('aboutTabChange', { detail: { tab } }));
    }
    
    const element = document.getElementById(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  showDropdown(): void {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    this.showAboutDropdown.set(true);
  }

  hideDropdown(): void {
    this.dropdownTimeout = setTimeout(() => {
      this.showAboutDropdown.set(false);
    }, 200);
  }

  keepDropdownOpen(): void {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
  }

  private updateIndicatorPosition(): void {
    const activeAnchor = this.activeSection();
    const activeLink = document.querySelector(`.nav-link[href="#${activeAnchor}"]`) as HTMLElement;
    
    if (activeLink) {
      const container = activeLink.closest('.nav-links-container') as HTMLElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        const left = linkRect.left - containerRect.left;
        const width = linkRect.width;
        
        this.indicatorStyle.set({
          left: `${left}px`,
          width: `${width}px`
        });
      }
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
