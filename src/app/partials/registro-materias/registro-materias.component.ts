import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';

// Usamos jason
declare var $: any;

@Component({
  selector: 'app-registro-materias',
  templateUrl: './registro-materias.component.html',
  styleUrls: ['./registro-materias.component.scss']
})
export class RegistroMateriasComponent implements OnInit{

  // creo mi jason para materias
  public materia: any = {
    dias_json: [], // Inicializar el arreglo vacío aquí
    hora_inicio: '', // Inicializar
    hora_final: '' // Inicializar
  };
  public errors: any = {};
  public editar: boolean = false;

  //Check
  public valoresCheckbox: any = [];
  // public dias_json: any[] = [];

  // Arreglo estatico para el select
  public programaEducativo: any[] = [
    { value: '1', viewValue: 'Ingenieria en Ciencias de la Computacion' },
    { value: '2', viewValue: 'Licenciatura en Ciencias de la Computacion' },
    { value: '3', viewValue: 'Ingenieria en Tecnologias de la Informacion' },
  ];

  // Arreglo estatico jason
  public dias = [
    { value: 'lunes', viewValue: 'Lunes' },
    { value: 'martes', viewValue: 'Martes' },
    { value: 'miercoles', viewValue: 'Miércoles' },
    { value: 'jueves', viewValue: 'Jueves' },
    { value: 'viernes', viewValue: 'Viernes' },
    { value: 'sabado', viewValue: 'Sábado' }
  ];

  constructor(
    private location: Location,
    private materiasService: MateriasService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService
  ) { }

  ngOnInit() {
    // Inicializar la materia u obtenerla de ser una edición
    this.materia = this.materiasService.esquemaMateria();
    console.log("Materia: ", this.materia);
  }

  // Regreso una pagina antes
  public regresar() {
    this.location.back();
  }

  
  public registrar() {
    // Reiniciamos los errores
    this.errors = {};

    // Validamos la materia
    this.errors = this.materiasService.validarMateria(this.materia, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      // alert("Los campos no son correctos");
      return false;
    }

    // Verificamos si hay errores de validación
    if (Object.keys(this.errors).length === 0) {
      // Si no hay errores, realizamos el registro
      this.materiasService.registrarMateria(this.materia).subscribe(
        (response) => {
          // Registro exitoso
          console.log("Materia registrada correctamente:", response);
          // Puedes agregar aquí la lógica para redirigir a otra página o mostrar un mensaje de éxito  this.router.navigate(["/"]);
        },
        (error) => {
          // Manejo de errores
          console.error("Error al registrar la materia:", error);
          // Puedes agregar aquí la lógica para mostrar un mensaje de error al usuario
        }
      );
    }
  }


  public actualizar(){

  }

  // Diferente a la original
  public checkboxChange(event: any) {
    console.log("Evento: ", event);
    
    if (event.checked) {
      this.materia.dias_json.push(event.source.value);
    } else {
      console.log(event.source.value);
      this.materia.dias_json.forEach((dia, i) => {
        if (dia === event.source.value) {
          // Splice recorre el arreglo de uno en uno
          this.materia.dias_json.splice(i, 1);
        }
      });
    }
    console.log("Array dias: ", this.materia.dias_json);
  }


  public changeSelect(event: any) {
    console.log(event.value);
    this.materia.programa_educativo = event.value;
  }

  public revisarSeleccion(nombre: string) {
    if (this.materia.dias_json) {
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

}
