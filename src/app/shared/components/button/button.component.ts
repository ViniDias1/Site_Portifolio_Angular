import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="'btn btn-' + variant() + ' btn-' + size()"
      [disabled]="disabled()"
      (click)="handleClick()"
      [type]="type()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      font-family: var(--font-family-primary);
      font-weight: var(--font-weight-medium);
      border-radius: var(--radius-base);
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .btn-primary {
      background: var(--color-primary);
      color: var(--color-text-inverse);

      &:hover:not(:disabled) {
        background: var(--color-primary-dark);
      }
    }

    .btn-secondary {
      background: var(--color-secondary);
      color: var(--color-text-inverse);

      &:hover:not(:disabled) {
        opacity: 0.9;
      }
    }

    .btn-outline {
      background: transparent;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);

      &:hover:not(:disabled) {
        background: var(--color-primary);
        color: var(--color-text-inverse);
      }
    }

    .btn-ghost {
      background: transparent;
      color: var(--color-text-primary);

      &:hover:not(:disabled) {
        background: var(--color-background-secondary);
      }
    }

    .btn-sm {
      padding: var(--spacing-2) var(--spacing-4);
      font-size: var(--font-size-sm);
    }

    .btn-md {
      padding: var(--spacing-3) var(--spacing-6);
      font-size: var(--font-size-base);
    }

    .btn-lg {
      padding: var(--spacing-4) var(--spacing-8);
      font-size: var(--font-size-lg);
    }
  `]
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  
  clicked = output<void>();

  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
