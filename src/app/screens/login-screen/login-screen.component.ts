import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorService } from '../../services/tools/validator.service';
import { FacadeService } from 'src/app/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public type: String = "password";
  // Declaro mi jason
  public errors: any = {};

  // Recordar la inyeccion del componente la hago en el constuctor
  constructor(
    private router: Router,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {

  }

  public login() {
    // Validar
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
  }

  public registrar() {
    this.router.navigate(["registro-usuarios"]);
  }

  public showPassword() {
    if (this.type == "password") {
      //Muestra la contraseña
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    } else if (this.type == "text") {
      //Oculta la contraseña
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }
}
