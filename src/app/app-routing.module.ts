import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import {ComentariosComponent} from './components/comentarios/comentarios.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'categoria/:idCategoria',
    component: CategoriaComponent
  },
  {
    path: 'graficas',
    component: GraficasComponent
  },
  {
    path: '',
    component: CategoriaComponent
  },
  {
    path: 'comentarios',
    component: ComentariosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



