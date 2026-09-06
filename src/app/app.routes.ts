import { Routes } from '@angular/router';
import {ListaUsuarios} from "./components/lista-usuarios/lista-usuarios";
import {DetalleUsuario } from './components/detalle-usuario/detalle-usuario';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full'
    },
    {
        path: 'usuarios',
        component: ListaUsuarios
    },
    {
        path: 'usuarios/:id',
        component: DetalleUsuario
    },
    
];
