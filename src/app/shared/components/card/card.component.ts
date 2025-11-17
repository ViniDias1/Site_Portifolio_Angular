import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'card ' + variant() + (hoverable() ? ' card-hoverable' : '')">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
      transition: all var(--transition-base);
    }

    .card-hoverable {
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
        border-color: var(--color-primary);
      }
    }

    .elevated {
      box-shadow: var(--shadow-md);
      border: none;
    }

    .flat {
      box-shadow: none;
    }
  `]
})
export class CardComponent {
  variant = input<'flat' | 'elevated'>('flat');
  hoverable = input<boolean>(false);
}
