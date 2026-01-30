import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  
  messages = signal<ChatMessage[]>([]);
  isTyping = signal(false);
  private scriptTimeouts: any[] = [];

  // EL GUION: Aquí escribes lo que va a pasar
  fullScript: ChatMessage[] = [
    { id: 1, text: 'INITIALIZING_MEMORY_CORE...', sender: 'system' },
    { id: 2, text: 'MOUNTING_VOLUME: /shared_history', sender: 'system' },
    { id: 3, text: 'ACCESS_GRANTED. DECRYPTING FILES...', sender: 'system' },
    
    // El bot empieza a hablar
    { id: 4, text: 'Hola Annita.', sender: 'bot' },
    { id: 5, text: 'Si lees esto, lograste saltar la seguridad del museo.', sender: 'bot' },
    { 
      id: 5.5, 
      text: 'SCANNING_ATTACHED_FILE: evidence_01.jpg...', 
      sender: 'system',
      // ¡CAMBIA ESTO POR TU IMAGEN! Ej: 'assets/images/nosotros_pixel.jpg'
      imageUrl: 'assets/images/roblox/roblox_1.jpg' 
    },
    
    { id: 6, text: '[WARNING]: CPU_TEMP CRITICAL (Heartbeat > 120bpm)', sender: 'system' },
    
    { id: 7, text: 'Solo quería decirte que...', sender: 'bot' },
    { id: 8, text: 'Detrás de todo este código, hay alguien real.', sender: 'bot' },
    { id: 9, text: 'Y esa persona te quiere mucho.', sender: 'bot' },
    
    { id: 10, text: 'END_OF_TRANSMISSION', sender: 'system' },
    { id: 11, text: 'USER_DISCONNECTION', sender: 'system' },
    { id: 12, text: 'SHUTTING_DOWN...', sender: 'system' },
  ];

  ngOnInit() {
    this.playScript();
  }

  ngOnDestroy() {
    this.scriptTimeouts.forEach(t => clearTimeout(t));
  }

  playScript() {
    let delay = 500;

    this.fullScript.forEach((msg, index) => {
      // 1. Calcular tiempos de espera realistas
      // Los mensajes de sistema son rápidos, los de bot tardan más (simulan escribir)
      const typingTime = msg.sender === 'system' ? 800 : 2500; 
      
      const timeoutId = setTimeout(() => {
        
        // Si es Bot, mostramos "Escribiendo..." antes
        if (msg.sender === 'bot') {
          this.isTyping.set(true);
          
          // Esperar un poco simulando que piensa/escribe
          setTimeout(() => {
            this.isTyping.set(false);
            this.addMessage(msg);
            this.scrollToBottom();
          }, 1500); // 1.5s escribiendo
          
        } else {
          // Sistema es instantáneo
          this.addMessage(msg);
          this.scrollToBottom();
        }

      }, delay);

      this.scriptTimeouts.push(timeoutId);
      
      // Aumentamos el delay para el siguiente mensaje
      // (Tiempo de espera inicial + tiempo de escritura + pausa de lectura)
      delay += typingTime + 1000; 
    });
  }

  addMessage(msg: ChatMessage) {
    this.messages.update(current => [...current, msg]);
  }

  scrollToBottom() {
    // Pequeño hack para bajar el scroll automáticamente
    setTimeout(() => {
      const container = document.getElementById('chat-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}