import { Routes } from '@angular/router';
import { EnvelopeComponent } from './components/envelope/envelope.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ChatComponent } from './pages/chat/chat.component';

export const routes: Routes = [
    { path: '', component: EnvelopeComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'back', component: ChatComponent },
    { path: '**', redirectTo: '' }

];
