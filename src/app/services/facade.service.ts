import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private validatorService: ValidatorService,
    private errorService: ErrorsService
  ) { }

  // Funcion para validar login
  public validarLogin(username: String, password: String){
    // Lo combierto a jason
    var data = {
      "username": username,
      "password": password
    }

    console.log("Validar login...", data);
    // Siempre mi arreglo de errores.
    let error: any = [];
    // Estos los inyecto en el html del login-screen
    if (!this.validatorService.required(data["username"])) {
      error["username"] = this.errorService.required;
    } 
    else if (!this.validatorService.max(data["username"],40)){
      error["username"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorService.email;
    }

    if (!this.validatorService.required(data["password"])) {
      error["password"] = this.errorService.required;
    }

    return error;
  }
  
}
