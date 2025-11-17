import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  
  // Signal para o tema atual
  public theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Effect para aplicar o tema quando mudar
    effect(() => {
      const theme = this.theme();
      this.applyTheme(theme);
      this.saveTheme(theme);
    });
  }

  /**
   * Alterna entre tema claro e escuro
   */
  toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }

  /**
   * Define um tema específico
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  /**
   * Obtém o tema inicial (localStorage ou preferência do sistema)
   */
  private getInitialTheme(): Theme {
    // Tentar recuperar do localStorage
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    // Usar preferência do sistema
    const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Aplica o tema no documento
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  }

  /**
   * Salva o tema no localStorage
   */
  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.THEME_KEY, theme);
  }
}
