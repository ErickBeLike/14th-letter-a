import { Component, OnInit, signal, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'bot' | 'user' | 'system'; // 'system' para logs de código
  typing?: boolean;
  imageUrl?: string;
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  showActions = signal(false);
  messages = signal<ChatMessage[]>([]);
  isTyping = signal(false);
  isExiting = signal(false);
  private scriptTimeouts: any[] = [];
  private audioService = inject(AudioService);

  constructor() {
    // Disparar el glitch ANTES de que Angular renderice el componente
    this.audioService.stopWithGlitch();
  }

  // EL GUION: Aquí escribes lo que va a pasar
  fullScript: ChatMessage[] = [
    { id: 1, text: 'INITIALIZING_MEMORY_CORE...', sender: 'system' },
    { id: 2, text: 'MOUNTING_VOLUME: /shared_history', sender: 'system' },
    { id: 3, text: 'ACCESS_GRANTED. DECRYPTING FILES...', sender: 'system' },

    // El bot empieza a hablar
    { id: 4, text: 'Hola Annita.', sender: 'bot' },
    {
      id: 5,
      text: 'Lo dicho, feliz día de san Valentín, paletita?.',
      sender: 'bot',
    },

    {
      id: 5.5,
      text: 'SCANNING_ATTACHED_FILE: lolipop.jpg...',
      sender: 'system',
      imageUrl: 'assets/images/other/lolipop.png',
    },
    { id: 6, text: 'Que no se pierda esa constumbre.', sender: 'bot' },

    { id: 7, text: 'Estaba desarrollando esto y lo dicho.', sender: 'bot' },
    {
      id: 8,
      text: 'Me parece una bonita locura el cómo se pasó de un vovox a una amistad muy colorida en todo aspecto.',
      sender: 'bot',
    },
    { id: 9, text: 'Y de eso a un "Ya estamos en Córdoba".', sender: 'bot' },
    {
      id: 10,
      text: 'Lo sigo diciendo, fue una montaña rusa de emociones en tan solo 3 días.',
      sender: 'bot',
    },
    {
      id: 11,
      text: 'Siempre he sido fanático de contar o leer historias y al final terminé viviendo una yo jeje.',
      sender: 'bot',
    },
    {
      id: 12,
      text: 'Sé que días atrás has estado full máquina con todo el asunto del estudio y de la propia uni.',
      sender: 'bot',
    },
    { id: 13, text: 'Toda una etapa nueva.', sender: 'bot' },
    {
      id: 14,
      text: 'De la cual te seguiré apoyando incondicionalmente.',
      sender: 'bot',
    },
    {
      id: 15,
      text: 'Y esperando seguir siendo partícipe aunque sea de lejitos.',
      sender: 'bot',
    },
    { id: 16, text: 'De lejitos pero conectados <3.', sender: 'bot' },

    {
      id: 16.5,
      text: 'SCANNING_ATTACHED_FILE: encounter_4.jpg...',
      sender: 'system',
      imageUrl: 'assets/images/encounter/encounter_4.jpeg',
    },

    {
      id: 17,
      text: 'Quería dejarte un pequeño checkpoint por aquí, así casualmente.',
      sender: 'bot',
    },

    {
      id: 18,
      text: '[WARNING]: CPU_TEMP CRITICAL (Heartbeat > 120bpm)',
      sender: 'system',
    },

    {
      id: 19,
      text: 'Recordándote que eres mi persona favorita.',
      sender: 'bot',
    },
    {
      id: 19.5,
      text: 'SCANNING_ATTACHED_FILE: knight_and_princess.jpg...',
      sender: 'system',
      imageUrl: 'assets/images/other/knight_and_princess.jpg',
    },

    { id: 20, text: 'O debería decir...', sender: 'bot' },
    { id: 21, text: 'Mi chispa suprema? (⌐⊙_⊙).', sender: 'bot' },
    {
      id: 21.5,
      text: 'SCANNING_ATTACHED_FILE: draw.jpg...',
      sender: 'system',
      imageUrl: 'assets/images/other/draw.png',
    },

    {
      id: 22,
      text: 'Pero vaya, gracias por las risas, las charlas, los abrazos y todo este tiempo.',
      sender: 'bot',
    },
    { id: 23, text: 'Aún con todo y mis lagunas mentales...', sender: 'bot' },
    {
      id: 24,
      text: 'Realmente no necesito que sea 14 de febrero para recordártelo, pero bueno, es un buen pretexto jeje.',
      sender: 'bot',
    },
    {
      id: 25,
      text: 'Espero que te guste, lo hice con mucho amor y cariño.',
      sender: 'bot',
    },
    { id: 26, text: 'Te mando un abracito digital.', sender: 'bot' },
    { id: 27, text: 'INITIATING_HUG_SEQUENCE', sender: 'system' },

    {
      id: 27.5,
      text: 'SCANNING_ATTACHED_FILE: hug.jpg...',
      sender: 'system',
      imageUrl: 'assets/images/other/hug.png',
    },

    {
      id: 28,
      text: 'Prometo saldar mi deuda de abrazos en algún futuro encuentro volumen 2.',
      sender: 'bot',
    },

    { id: 29, text: '...', sender: 'bot' },

    {
      id: 30,
      text: '[WARNING]: CPU_TEMP CRITICAL (Heartbeat > 150bpm)',
      sender: 'system',
    },

    { id: 31, text: 'Te quiero mucho.', sender: 'bot' },
    { id: 32, text: 'Feliz día de San Valentín.', sender: 'bot' },

    { id: 33, text: 'USER_DISCONNECTION', sender: 'system' },
    { id: 34, text: 'SYSTEM_SHUTDOWN', sender: 'system' },
  ];

  ngOnInit() {
    this.playScript();
  }

  ngOnDestroy() {
    this.scriptTimeouts.forEach((t) => clearTimeout(t));
  }

  clearTimeouts() {
    this.scriptTimeouts.forEach((t) => clearTimeout(t));
    this.scriptTimeouts = [];
  }

  playScript() {
    let cumulativeDelay = 500;

    this.fullScript.forEach((msg) => {
      // 1. CALCULAR TIEMPO DE ESCRITURA (typingTime)
      // Si el texto es largo, tardamos más en "escribirlo" (animación de puntitos)
      let typingDuration = msg.sender === 'system' ? 500 : 2000;

      if (msg.sender === 'bot') {
        // Si el mensaje es muy largo, tardamos un poco más en escribirlo
        if (msg.text.length > 60) typingDuration = 3000;
        if (msg.text.length < 15) typingDuration = 1200; // Mensajes cortos rápidos
      }

      // 2. CALCULAR TIEMPO DE LECTURA (pauseAfter)
      // Este es el tiempo que se queda el mensaje en pantalla antes de que empiece el siguiente
      let readingPause = 2000; // Base: 2 segundos

      // Si tiene más de 50 caracteres, damos 5 segundos
      if (msg.text.length > 50) readingPause = 5000;

      // Si tiene más de 100 caracteres, damos 7 segundos
      if (msg.text.length > 100) readingPause = 7000;

      // Si es una IMAGEN, damos bastante tiempo para verla (5 segundos)
      if (msg.imageUrl) readingPause = 5000;

      const timeoutId = setTimeout(() => {
        // Si es Bot, mostramos "Escribiendo..."
        if (msg.sender === 'bot' || msg.sender === 'user') {
          this.isTyping.set(true);

          // Esperar el tiempo de "escritura"
          setTimeout(() => {
            this.isTyping.set(false);
            this.addMessage(msg);
            this.scrollToBottom();
          }, typingDuration);
        } else {
          // Sistema es instantáneo (logs)
          this.addMessage(msg);
          this.scrollToBottom();
        }
      }, cumulativeDelay);

      this.scriptTimeouts.push(timeoutId);

      // Aumentamos el delay acumulado para el SIGUIENTE mensaje
      // Sumamos: Lo que tarda en empezar + lo que tarda en escribir + lo que tarda en leerse
      const stepDelay =
        msg.sender === 'bot' || msg.sender === 'user' ? typingDuration : 0;
      cumulativeDelay += stepDelay + readingPause;
    });

    const finalTimeout = setTimeout(() => {
      this.showActions.set(true);
      this.scrollToBottom();
    }, cumulativeDelay + 2000);

    this.scriptTimeouts.push(finalTimeout);
  }

  addMessage(msg: ChatMessage) {
    this.messages.update((current) => [...current, msg]);
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = document.getElementById('chat-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }

  reload() {
    // REINICIO: Activamos efecto y luego nos vamos
    this.audioService.stopAll();
    this.triggerExit(() => this.router.navigate(['/']));
  }

  goBack() {
    // VOLVER: Activamos efecto y luego nos vamos
    this.triggerExit(() => this.router.navigate(['/gallery']));
  }

  // Función auxiliar para no repetir código
  private triggerExit(callback: () => void) {
    this.isExiting.set(true);
    // Esperamos 800ms (duración de la animación)
    setTimeout(() => {
      callback();
    }, 800);
  }
}
