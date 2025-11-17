import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected showDevWarning = signal(false);

  ngOnInit(): void {
    if (environment.inDev) {
      const hasSeenWarning = sessionStorage.getItem('devWarningShown');
      if (!hasSeenWarning) {
        this.showDevWarning.set(true);
        sessionStorage.setItem('devWarningShown', 'true');
      }
    }
  }

  closeDevWarning(): void {
    this.showDevWarning.set(false);
  }
}
