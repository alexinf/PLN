import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ComentariosService } from './../../service/comentarios.service'


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,  private comentariosService: ComentariosService) { }
  
  public proyectos;

  ngOnInit(): void {
    this.proyectos = ['1', '2', '3', '4', '5']
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      comentario: '',
      proyectoid: ''
    });
  }

  agregarComentario(){
    const formulario = this.formGroup.value;
    console.log(formulario);
    this.comentariosService.createComentario(formulario)
      .subscribe(data => {
         console.log(data)
         document.getElementById('correcto').innerHTML = "Se envio correctamente"
         document.getElementById('correcto').style.color = "green"
      },error => {
        console.log(error)
        document.getElementById('correcto').innerHTML = "No se envio - Error"
        document.getElementById('correcto').style.color = "red"
      })
  }

  changeProy(e){
    let id = this.formGroup.value['proyectoid']
    document.getElementById('imgProyect')['src'] =  `assets/img/${id}.jpg`
  }

}
