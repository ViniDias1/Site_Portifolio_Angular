import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionComponent } from '../../../shared/components/section/section.component';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, SectionComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {
  private readonly contentService = inject(ContentService);
  
  protected skills = toSignal(this.contentService.getSkills(), { initialValue: [] });
  protected selectedCategory = signal<string>('Todos');
  
  protected categories = computed(() => {
    const skills = this.skills();
    return ['Todos', ...new Set(skills.map(s => s.category))];
  });
  
  protected filteredSkills = computed(() => {
    const category = this.selectedCategory();
    if (category === 'Todos') {
      return this.skills();
    }
    return this.skills().filter(skill => skill.category === category);
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
