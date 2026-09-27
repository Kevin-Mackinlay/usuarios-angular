import { Routes } from '@angular/router';

import {DetalleUsuario } from './components/detalle-usuario/detalle-usuario';
import { FormularioUsuario } from './components/formulario-usuario/formulario-usuario';
import { ListaUsuarios } from './components/lista-usuarios/lista-usuarios';
import {ListaAutos} from './components/lista-autos/lista-autos';
import { FormularioAuto } from './components/formulario-auto/formulario-auto';


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
        path: 'usuarios/nuevo',
        component: FormularioUsuario
    },
    {
        path: 'usuarios/:id/editar',
        component: FormularioUsuario
    },
    {
        path: 'usuarios/:id',
        component: DetalleUsuario
    },
    {
        path: 'autos/nuevo',
        component: FormularioAuto
    },
    {
        path: 'autos/:id/editar',
        component: FormularioAuto
    },
    {
        path: 'autos',
        component: ListaAutos
    },
    
];
