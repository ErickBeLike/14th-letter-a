import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryFrameComponent } from '../../components/memory-frame/memory-frame.component';
import { Memory } from '../../models/memory.model';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, MemoryFrameComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  memories: Memory[] = [
    {
      id: 1,
      title: 'Donde todo empezó',
      date: 'Época Roblox',
      images: [
        'assets/images/roblox1.jpg', // Foto 1
        'assets/images/roblox2.jpg', // Foto 2
        'assets/images/roblox3.jpg', // Foto 3
      ],
      description:
        'Aquí pondrás el texto cursi sobre cómo se conocieron en Roblox...',
    },
    {
      id: 2,
      title: 'Mundo Cuadrado',
      date: 'Época Minecraft',
      images: [
        'assets/images/roblox1.jpg', // Foto 1
        'assets/images/roblox2.jpg', // Foto 2
        'assets/images/roblox3.jpg', // Foto 3
      ],
      description: 'Las construcciones, las risas, el server...',
    },
    {
      id: 3,
      title: 'El Prime',
      date: 'Peak Gaming',
      images: [
        'assets/images/roblox1.jpg', // Foto 1
        'assets/images/roblox2.jpg', // Foto 2
        'assets/images/roblox3.jpg', // Foto 3
      ],
      description: 'Cuando jugaban todo el día...',
    },
    {
      id: 4,
      title: 'Arte Compartido',
      date: 'Nuestros Dibujos',
      images: [
        'assets/images/roblox1.jpg', // Foto 1
        'assets/images/roblox2.jpg', // Foto 2
        'assets/images/roblox3.jpg', // Foto 3
      ],
      description: 'El collage de los dibujos que se han hecho...',
    },
    {
      id: 5,
      title: 'Distancia Cero',
      date: 'El Balcón',
      images: [
        'assets/images/roblox1.jpg', // Foto 1
        'assets/images/roblox2.jpg', // Foto 2
        'assets/images/roblox3.jpg', // Foto 3
      ],
      description: 'Esa foto especial...',
    },
  ];
}
