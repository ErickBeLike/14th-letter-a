import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {
  private router = inject(Router);
  
  isOpening = signal(false);
  isTransitioning = signal(false); // <--- NUEVA SEÑAL: Controla el fundido a crema

  openEnvelope() {
    if (this.isOpening()) return;

    // 1. Empieza la animación del sobre
    this.isOpening.set(true);
    
    // 2. A los 800ms (cuando la carta ya va saliendo), empezamos a fundir la pantalla a crema
    setTimeout(() => {
      this.isTransitioning.set(true);
    }, 800);

    // 3. A los 2 segundos (cuando ya está todo crema), cambiamos de ruta sin que se note
    setTimeout(() => {
      this.router.navigate(['/gallery']); 
    }, 2000);
  }
}