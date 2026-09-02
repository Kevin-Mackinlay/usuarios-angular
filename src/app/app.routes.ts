import { Routes } from '@angular/router';
import {ListaUsuarios} from "./components/lista-usuarios/lista-usuarios";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full'
    },
    {
        path: 'usuarios',
        component: ListaUsuarios
    }
];
