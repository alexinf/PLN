import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { MenuComponent } from './components/menu/menu.component';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ColorPickerModule } from 'ngx-color-picker';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import {SelectModule} from 'ng2-select';

@NgModule({
  
  declarations: [
    AppComponent,
    CategoriaComponent,
    GraficasComponent,
    MenuComponent,
    ComentariosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
