import { Component, input, output, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="modal-backdrop animate-fade-in" (click)="onBackdropClick()">
        <div class="modal-content animate-scale-in" (click)="onContentClick($event)">
          <button class="modal-close" (click)="close()" aria-label="Fechar modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-4);
      z-index: var(--z-modal-backdrop);
      backdrop-filter: blur(4px);
    }

    .modal-content {
      position: relative;
      background: var(--color-surface);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-xl);
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      z-index: var(--z-modal);
    }

    .modal-close {
      position: absolute;
      top: var(--spacing-4);
      right: var(--spacing-4);
      background: var(--color-background-secondary);
      border: none;
      border-radius: var(--radius-full);
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--color-text-secondary);
      z-index: 1;

      &:hover {
        background: var(--color-background-tertiary);
        color: var(--color-text-primary);
        transform: rotate(90deg);
      }
    }
  `]
})
export class ModalComponent {
  isOpen = input.required<boolean>();
  closed = output<void>();

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.close();
  }

  onContentClick(event: Event): void {
    event.stopPropagation();
  }
}
