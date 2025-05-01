import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CallsComponent } from './calls/calls.component';
import { StreamComponent } from './stream/stream.component';
import { ListenComponent } from './listen/listen.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'watch',
        component: MainPageComponent
    },
    {
        path: 'calls',
        component: CallsComponent
    },
    {
        path: 'stream',
        component: StreamComponent
    },
    {
        path: 'listen',
        component: ListenComponent
    }
];
