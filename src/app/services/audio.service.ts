import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private tracks: { [key: string]: HTMLAudioElement } = {};
  private currentTrack: string | null = null;
  private transitionInterval: any = null; // Unificado para controlar cualquier timer

  constructor() {
    this.tracks['romance'] = new Audio('assets/music/Salut_d_Amour.mp3');

    Object.values(this.tracks).forEach((audio) => {
      audio.loop = true;
      audio.volume = 0;
      audio.preload = 'auto';
    });
  }

  play(trackName: 'romance') {
    if (this.currentTrack === trackName) return;

    const newAudio = this.tracks[trackName];
    const oldAudio = this.currentTrack ? this.tracks[this.currentTrack] : null;

    this.currentTrack = trackName;
    if (this.transitionInterval) clearInterval(this.transitionInterval);

    // TRUCO: Siempre damos .play() INMEDIATAMENTE para que el navegador no bloquee el audio.
    // Pero lo hacemos con volumen 0. La "audibilidad" la controlamos abajo.
    newAudio.volume = 0;
    newAudio.play().catch((error) => console.warn('Autoplay bloqueado', error));

    // ► EFECTO ROMÁNTICO (CON DELAY)
    // Le damos 800ms de delay para que cuadre con la animación del sobre
    this.elegantTransition(newAudio, oldAudio, 800);
  }

  stopAll() {
    if (this.transitionInterval) clearInterval(this.transitionInterval);
    Object.values(this.tracks).forEach((audio) => {
      this.fadeOutAndStop(audio);
    });
    this.currentTrack = null;
  }

  stopWithGlitch() {
    if (this.transitionInterval) clearInterval(this.transitionInterval);

    // Detenemos la pista actual con efecto glitch
    if (this.currentTrack && this.tracks[this.currentTrack]) {
      const audio = this.tracks[this.currentTrack];

      // Patrón de interferencia MÁS EXTREMO: volúmenes más altos y bajos alternando
      const glitchPattern = [0.7, 0, 0.8, 0, 0.6, 0, 0.9, 0, 0.5, 0, 0.75, 0];
      let step = 0;

      this.transitionInterval = setInterval(() => {
        if (step < glitchPattern.length) {
          audio.volume = glitchPattern[step];
          step++;
        } else {
          // Terminó la interferencia, detenemos completamente
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          clearInterval(this.transitionInterval);
          this.currentTrack = null;
        }
      }, 55); // Cambios EXTREMADAMENTE rápidos (cada 55ms)
    }
  }

  // --- TRANSICIÓN 1: ROMÁNTICA (Delay + Fade Suave) ---
  private elegantTransition(
    fadeIn: HTMLAudioElement,
    fadeOut: HTMLAudioElement | null,
    delayMs: number,
  ) {
    // 1. Si hay algo sonando antes (ej: vienes del chat), lo bajamos suave
    if (fadeOut) {
      this.fadeOutAndStop(fadeOut);
    }

    // 2. Esperamos el tiempo del delay antes de subir el volumen de la nueva
    setTimeout(() => {
      // Fade In suave
      const maxVolume = 0.5;
      let vol = 0;
      const fadeUp = setInterval(() => {
        if (this.currentTrack !== 'romance') {
          clearInterval(fadeUp);
          return;
        } // Seguridad

        vol += 0.02; // Sube despacito
        if (vol >= maxVolume) {
          fadeIn.volume = maxVolume;
          clearInterval(fadeUp);
        } else {
          fadeIn.volume = vol;
        }
      }, 200); // Cada 50ms sube un poquito
    }, delayMs);
  }

  private fadeOutAndStop(audio: HTMLAudioElement) {
    const timer = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume -= 0.05;
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        clearInterval(timer);
      }
    }, 100);
  }
}
