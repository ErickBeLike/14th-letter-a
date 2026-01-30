import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Memory } from '../../models/memory.model';

@Component({
  selector: 'app-memory-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memory-frame.component.html',
  styleUrl: './memory-frame.component.css'
})
export class MemoryFrameComponent implements OnInit, OnDestroy {
  @Input({ required: true }) data!: Memory;

  currentIndex = signal(0);
  private intervalId: any;

  ngOnInit() {
    // Solo iniciamos el carrusel si hay más de una foto
    if (this.data.images.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  // Avanzar a la siguiente foto
  next() {
    if (this.data.images.length <= 1) return;

    this.stopAutoPlay();
    this.currentIndex.update(index => 
      (index + 1) % this.data.images.length
    );
    this.startAutoPlay();
  }

  // Ir a una foto específica (dots)
  goTo(index: number) {
    this.stopAutoPlay();
    this.currentIndex.set(index);
    this.startAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.currentIndex.update(index => (index + 1) % this.data.images.length);
    }, 4000); // Cambia cada 4 segundos
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}