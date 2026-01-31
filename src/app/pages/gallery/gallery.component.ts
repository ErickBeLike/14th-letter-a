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
  isReturning = signal(false);
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
        'Y de la nada un día muy casual jugando con Aza salió el tema de que tenía una amistad con alguien y que si me parecía que se jugara entre los 3, a lo que accedí sin pensarlo mucho. Realmente nunca pensé que de ahí evolucionaría a todo lo que vino después, pero me alegro mucho de haber dicho que sí. De ahí fue cuestión de tiempo para que la sesiones de Roblox se volviesen algo esperado día con día, semana con semana. Desde entonces no faltaron noches de terror, risas y aventuras en ese mundito robloxiano. He ahí parte del cariño y afecto que le tengo a nuestros personajes, fueron el principio de la representación de cada uno en ese espacio compartido. A todo esto, debería de salir un bobox de nuevo, no? :).',
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
      description: 'El tiempo hizo de las suyas y eventualmente el Roblox se nos estaba quedando corto, mira que es raro por la cantidad de experiencias que tiene pero así fue. Fue ahí cuando salió la siguiente vida virtual y no podía ser otra que el Minecraft. Empezaron siendo sesiones cortas y casuales, pero eventualmente se volvieron algo más estructurado y planeado. Llegaron al punto de convertirse no solo en sesiones de juego sino hasta en sesiones de psicología mutua, o bueno, así lo sentía yo, jeje. Hasta la fecha tenemos muchos planes por hacer en ese mundito cúbico, y espero se puedan ir cumpliendo uno a uno. De ahí entró otro de nuestros pequeños "peaks", guiño, guiño, el cual no se queda corto en diversión y aventuras, literalmente, incluso se volvieron sesiones completas de infinidad de fotos. En una de esas que no haya muchas ocupaciones por parte de los dos estaría muy cuki volver a alguno de los 2, quizá en especial Minecraft, no? :D.',
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
      description: '¿Dibujos? querré decir obras de arte más bien, lo dicho, yo como persona soy alguien muy simbólico y cada que veía algún dibujito con el que me llegabas y decías "mira, dibujito" en ese momento, PUM, me alegraba por completo todo el día, semana o incluso mes. Probablemente haya quienes le encanten tus dibujos pero para mí tienen un significado mucho más profundo, representan tu presencia a distancia. Me autoproclamo el fan #1, tu fan #1, así de simple. Cada dibujo es como una pequeña ventana a tu mundo, tal cual como la vez que te lo comenté y por ende me alegra poder ver esa ventanita a ese tan bello mundo. Así que gracias por cada uno de esos dibujitos, significan mucho más de lo que imaginas. Lo he dicho, sin mis tesoros o como Gollum, son mis "preciosos". Como recién te conté, empecé a experimentar este mundito de dibujar por ti y contigo, he de decir que es hasta terapéutico y relajante, quizá algún día me animo a intentarlo en papel pero mientras, sigamos teniendo de manera espontánea esas sesiones de dibujo juntos, quizá en una de esas me pasas la "maña" para dibujar tan bien como tú ;).',
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
      description: 'Y la guinda del pastel, el encuentro en sí. Mira que ya lo he contado pero siendo sinceros no me cansaría de hacerlo, todo empezó como pensamientos e ideas vagas en donde me decía "jolines tío, estaría flipante conocerla en persona", quizá sin el acento castellano, jeje, pero empezó ese pensamiento como una posibilidad un tanto casual. Pero literalmente a "poco" de haber tenido esa epifanía, se dio la oportunidad en forma de píldora roja o azul que me contaste, en donde al final por situaciones de la vida (y ayuda del guión) se dio paso al plan de visita-vacaciones. No voy a negar que los días previos a la confirmación fueron un poquito caóticos en mi mente, al menos en el sentido de que "santos cielos, van a venir, ¿qué haré?, ¿cómo me comportaré?, ¿qué tal si no nos llevamos bien en persona?" pero era súper raro porque lo dicho, iba a ser conocer a alguien que conoces de hace mucho pero que a su vez no conoces en NADA. Llegado el día, pese a los nervios iniciales todo fluyó de manera muy natural, con detallitos de por medio pero nada grave, lo seguiré diciendo, que el local de "esquites" estuviese abierto fue una ayuda divina XD. Los días posteriores fueron literalmente toda una mini aventura a lo Roblox, estuvimos en un castillo medieval, volvimos a la prehistoria, vimos dragones, estuvimos en la playita, tuvimos un imperio, perdimos un imperio (JAJAJAJ, nos faltó un tycoon) pero vaya, creo que puedo dar a entender que esos poquitos 3 días, fueron literalmente TODA una experiencia. Acerca del desenlace, he de decir que el destino me pasó el balón de pechito para que la despedida se sintiese bonito y heróico, desde unas florecitas así casuales para ti y tu mami hasta una salvada histórica (tenía que hacerme merecedor de mi armadura) así como lo dije en su entonces, final con broche de oro. En esos días hubo varias foticos de las cuales no sabes cómo me alegran el día y el corazón cada que las veo, son como nuestras screenshots de Roblox pero en 4K, de las cuales no está de más decir que la que se ganó el podio en mi mente y corazón fue la del balcón, como los dibujos, no quiero dar preferencia pero es que esa me hace unos ojitos que fua chaval. En fin, gracias tanto a ti como a tu mami por haber dado la oportunidad de que se diese esa experiencia, tocará ver cuándo y cómo se hace "El encuentro, VOL. 2". :D.',
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

  returnToEnvelope() {
    // 1. Activar animación de salida suave (Fade to Cream)
    this.isReturning.set(true);

    // 2. Esperar 1 segundo y navegar avisando que "estamos volviendo"
    setTimeout(() => {
      this.router.navigate(['/'], { queryParams: { returning: 'true' } });
    }, 1000);
  }
}
