import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryFrameComponent } from '../../components/memory-frame/memory-frame.component';
import { Memory } from '../../models/memory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, MemoryFrameComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  isGlitchingOut = signal(false);
  private router = inject(Router);
  activeMemory = signal<Memory | null>(null);
  isClosing = signal(false);
  memories: Memory[] = [
    {
      id: 1,
      title: 'Donde todo empezó',
      date: 'Sale un Roblox?',
      images: [
        'assets/images/roblox/roblox_1.jpg', // Foto 1
        'assets/images/roblox/roblox_2.jpg', // Foto 2
        'assets/images/roblox/roblox_3.png', // Foto 3
        'assets/images/roblox/roblox_4.png', // Foto 4
        'assets/images/roblox/roblox_5.png', // Foto 5
      ],
      description:
        'Aquí pondrás el texto cursi sobre cómo se conocieron en Roblox...',
    },
    {
      id: 2,
      title: 'Vamoh a jugar...',
      date: 'Un poquito de to´',
      images: [
        'assets/images/mc/mc_1.png',
        'assets/images/peak/peak_1.png',

        'assets/images/mc/mc_2.png',
        'assets/images/peak/peak_2.png',

        'assets/images/mc/mc_3.png',
      ],
      description: 'Las construcciones, las risas, el server...',
    },
    {
      id: 3,
      title: 'La presencia a distancia',
      date: 'Dibujos que hablan',
      images: [
        'assets/images/draw/draw_1.jpeg',
        'assets/images/draw/draw_2.jpeg',
        'assets/images/draw/draw_3.jpeg',
        'assets/images/draw/draw_4.jpeg',
      ],
      description: 'Cuando jugaban todo el día...',
    },
    {
      id: 4,
      title: 'Distancia Cero',
      date: 'El encuentro',
      images: [
        'assets/images/encounter/encounter_1.jpeg',
        'assets/images/encounter/encounter_2.jpeg',
        'assets/images/encounter/encounter_4.jpeg',
        'assets/images/encounter/encounter_5.jpeg',
        'assets/images/encounter/encounter_3.jpeg',
      ],
      description: 'Esa foto especial...',
    },
  ];

  // Abrir el modal
  openModal(memory: Memory) {
    this.activeMemory.set(memory);
  }

  // Cerrar el modal
  closeModal() {
    this.isClosing.set(true); // 1. Empieza la animación

    setTimeout(() => {
      this.activeMemory.set(null); // 2. Cierra de verdad después de 300ms
      this.isClosing.set(false); // 3. Resetea el estado
    }, 300);
  }

  navigateToBot() {
    // 1. Activamos el modo caos
    this.isGlitchingOut.set(true); 
    
    // 2. Esperamos 800ms (lo que dura la animación) antes de cambiar de ruta
    setTimeout(() => {
        this.router.navigate(['/back']);
    }, 800);
  }
}
