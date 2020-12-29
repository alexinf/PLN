import { Component, OnInit } from '@angular/core';
import { ComentariosService } from './../../service/comentarios.service'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  ngOnInit(): void {
  }
  public requerimientos = [];
  constructor(private comentariosService: ComentariosService) {
    
  }
  mostrarRequerimientos(){
    
    this.comentariosService.mostrarRequerimiento()
    .subscribe(dataBack => {
      this.requerimientos = dataBack
      console.log(this.requerimientos)
    }, error => console.log(error))
  }
}
