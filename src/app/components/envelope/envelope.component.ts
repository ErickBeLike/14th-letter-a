import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-envelope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './envelope.component.html',
  styleUrl: './envelope.component.css',
})
export class EnvelopeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isOpening = signal(false);
  isTransitioning = signal(false);

  ngOnInit() {
    // Verificamos si venimos de "volver"
    this.route.queryParams.subscribe((params) => {
      if (params['returning'] === 'true') {
        this.runClosingAnimation();
      }
    });
  }

  runClosingAnimation() {
    // 1. ESTADO INICIAL: El sobre YA está abierto y la pantalla tapada (crema)
    // Esto simula que venimos del fundido de la galería
    this.isOpening.set(true);
    this.isTransitioning.set(true);

    // 2. Quitamos el telón crema suavemente (revelamos el sobre abierto)
    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 100);

    // 3. Después de que se vea el sobre abierto, LO CERRAMOS
    // Al poner isOpening en false, el CSS hará la animación inversa (bajar carta, cerrar solapa)
    setTimeout(() => {
      this.isOpening.set(false);
    }, 800);

    // 4. Limpiamos la URL para que si recarga la página, empiece normal (cerrado)
    setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { returning: null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    }, 2000);
  }

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
