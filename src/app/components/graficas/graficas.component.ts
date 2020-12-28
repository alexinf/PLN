import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {data} from '../../service/mockdata';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ComentariosService } from './../../service/comentarios.service'


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = []
  //['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true
  }
  // public lineChartOptions1: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public proyectos;
  public formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,  private comentariosService: ComentariosService) {
    // const {lineChartData, lineChartLabels} = this.prepareData(data);
    // this.lineChartData = lineChartData;
    // this.lineChartLabels = lineChartLabels;
    this.proyectos = ['1', '2', '3', '4', '5']
    this.buildForm();
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      proyectoid: ''
    });
  }


  changeProy(e){
    const formulario = this.formGroup.value;
    console.log(formulario);
    this.comentariosService.mostrarGrafica(formulario)
    .subscribe(dataBack => {
      const {lineChartData, lineChartLabels} = this.prepareData(dataBack);
      this.lineChartData = lineChartData;
      this.lineChartLabels = lineChartLabels;
    }, error => console.log(error))
  }

  prepareData(data) {
    const {datos} = data;
    const labels = [];
    const positivos = { data: [], label: 'positivos' };
    const negativos = { data: [], label: 'negativos' };
    const neutros = { data: [], label: 'neutros' };
    datos.forEach(item => {
      labels.push(item.fecha);
      positivos.data.push(item.calificaciones.pos);
      negativos.data.push(item.calificaciones.neg);
      neutros.data.push(item.calificaciones.neu);
    });
    return {
      lineChartData: [positivos, negativos, neutros],
      lineChartLabels: labels
    }
  }

  ngOnInit() {
  }
}
