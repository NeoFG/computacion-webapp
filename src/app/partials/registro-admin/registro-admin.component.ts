import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/services/administrador.service';
//Para poder usar jquery definir esto
declare var $: any;

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent implements OnInit {
  // Entrada de datos con el imput por el componente
  @Input() rol: string = "";

  public admin: any = {};
  public editar: boolean = false;
  // creo los jason
  public errors: any = {};
  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  // password porque es el input del ojo
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor(
    private administradoresService: AdministradorService,
    private router: Router
  ) { }

  // asigno mi esquema del jason al objeto
  ngOnInit(): void {
    this.admin = this.administradoresService.esquemaAdmin();
    this.admin.rol = this.rol;

    console.log("Admin: ", this.admin);
  }

  public regresar() {

  }

  public registrar() {

    /* Validar
      Inicializo el jason en un arreglo vacio. 
    */
    this.errors = [];

    /* Inyecto el servicio desde constructor
     validarAdmin que voy a validar el jason this.admin
     y mi bandera para editar */
    this.errors = this.administradoresService.validarAdmin(this.admin, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    // TODO:Después registraremos admin (hecho)
    // Validamos que las contrasenias coincidan
    // Validar la contrasenia
    // response si trae datos y mandame al login

    if (this.admin.password == this.admin.confirmar_password) {
      this.administradoresService.registrarAdmin(this.admin).subscribe(
        (response) => {
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        }, (error) => {
          alert("No se pudo registrar usuario");
        }
      );

    } else {
      // Limpio los campos los pongo en blanco
      alert("Las contraseñas no coinciden");
      this.admin.password = "";
      this.admin.confirmar_password = "";
    }
  }

  public actualizar() {

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
}
