import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="id()" [class]="'section ' + background()">
      <div class="container">
        @if (title()) {
          <div class="section-header">
            <h2 class="section-title">{{ title() }}</h2>
            @if (subtitle()) {
              <p class="section-subtitle">{{ subtitle() }}</p>
            }
          </div>
        }
        <div class="section-content">
          <ng-content></ng-content>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section {
      padding: var(--spacing-20) 0;
      
      &.primary {
        background: var(--color-background);
      }

      &.secondary {
        background: var(--color-background-secondary);
      }
    }

    .container {
      max-width: var(--container-max-width);
      margin: 0 auto;
      padding: 0 var(--spacing-6);
    }

    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-12);
    }

    .section-title {
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-4) 0;
      line-height: var(--line-height-heading);
    }

    .section-subtitle {
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
    }

    .section-content {
      position: relative;
    }
  `]
})
export class SectionComponent {
  id = input<string>('');
  title = input<string>('');
  subtitle = input<string>('');
  background = input<'primary' | 'secondary'>('primary');
}
