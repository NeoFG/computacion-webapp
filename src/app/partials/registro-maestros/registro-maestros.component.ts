import { Component, Input, OnInit } from '@angular/core';
import { MaestrosService } from '../../services/maestros.service';

//Usamos jquery
declare var $: any;

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit {
  @Input() rol: string = "";

  // creo mi jason para maestro
  public maestro: any = {};
  public editar: boolean = false;
  // jason de error
  public errors: any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  // password porque es el input del ojo
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  // Arreglo estatico para el select
  public areas:any = [
    { value: '1', viewValue: 'Desarollo Web' },
    { value: '2', viewValue: 'Programacion' },
    { value: '3', viewValue: 'Bases de datos' },
    { value: '4', viewValue: 'Redes' },
    { value: '5', viewValue: 'Matematicas' },
  ];

  // Arreglo estatico jason
  public materias: any[] = [
    { value: '1', nombre: 'Aplicaciones Web' },
    { value: '2', nombre: 'Programación 1' },
    { value: '3', nombre: 'Bases de datos' },
    { value: '4', nombre: 'Tecnologías Web' },
    { value: '5', nombre: 'Minería de datos' },
    { value: '6', nombre: 'Desarrollo móvil' },
    { value: '7', nombre: 'Estructuras de datos' },
    { value: '8', nombre: 'Administración de redes' },
    { value: '9', nombre: 'Ingeniería de Software' },
    { value: '10', nombre: 'Administración de S.O.' },
  ];

  constructor(
    private maestrosService: MaestrosService
  ) { }

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol;
    console.log("Maestro: ", this.maestro);
  }

  public regresar() {

  }

  public registrar() {
    //Validar
    // Inicializo el jason en un arreglo vacio.
    this.errors = [];

    // Inyecto el servicio desde constructor
    // validarMaestro que voy a validar el jason this.admin
    // y mi bandera para editar
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    // TODO: falta registrar
  }

  //Funciones para password
  showPassword() {
    if (this.inputType_1 == 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar() {
    if (this.inputType_2 == 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public actualizar() {

  }

  public checkboxChange(event: any) {
    //console.log("Evento: ", event);
    if (event.checked) {
      this.maestro.materias_json.push(event.source.value)
    } else {
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia, i) => {
        if (materia == event.source.value) {
          this.maestro.materias_json.splice(i, 1)
        }
      });
    }
    console.log("Array materias: ", this.maestro);
  }
}
