import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
declare var $: any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit{
  
  // No estoy muy seguro de este lo puse en el registro-screen.component.html y en el ngOnInit
  @Input() rol: string = ""; 

  public materia: any = {};
  public editar: boolean = false;
  public errors: any = {};

  // Check
  public valoresCheckbox: any = [];
  public dias_json: any[] = [];

  // Arreglo estatico para el select
  public programas: any[] = [
    { value: '1', viewValue: 'Ingenieria en Ciencias de la Computacion' },
    { value: '2', viewValue: 'Licenciatura en Ciencias de la Computacion' },
    { value: '3', viewValue: 'Ingenieria en Tecnologias de la Informacion' },
  ];

  public dias: any[] = [
    { value: '1', nombre: 'Lunes' },
    { value: '2', nombre: 'Martes' },
    { value: '3', nombre: 'Miercoles' },
    { value: '4', nombre: 'Jueves' },
    { value: '5', nombre: 'Viernes' },
    { value: '6', nombre: 'Sabado' },
  ];


  constructor(
    private location: Location,
    private materiasService: MateriasService
  ){}

  ngOnInit(): void {
    this.materia = this.materiasService.esquemaMateria();
    this.materia.rol = this.rol;
    console.log("Materia: ", this.materia);
  }

  public regresar() {
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    // Si viene vacio me retorna falso
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    // TODO: Despues registramos

  }

  public actualizar(){

  }

  public checkboxChange(event: any) {
    //console.log("Evento: ", event);
    if (event.checked) {
      this.materia.dias_json.push(event.source.value)
    } else {
      console.log(event.source.value);
      this.materia.dias_json.forEach((materia, i) => {
        if (materia == event.source.value) {
          this.materia.dias_json.splice(i, 1)
        }
      });
    }
    console.log("Array dias: ", this.materia);
  }

  public revisarSeleccion(nombre: string) {
    if (this.materia.materias_json) {
      var busqueda = this.materia.dias_json.find((element) => element == nombre);
      if (busqueda != undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //Select
  public changeSelect(event: any) {
    console.log(event.value);
    this.materia.programa_educativo = event.value;
  }

}
