import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FacadeService } from './facade.service';

// Configuracion de cabercera para la api
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaMaestro() {
    return {
      'rol': '',
      'id_trabajador': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'telefono': '',
      'rfc': '',
      'cubiculo': '',
      'area_investigacion': '',
      'materias_json': []
    }
  }

  //Validación para el formulario
  // dato de tipo any -> jason
  public validarMaestro(data: any, editar: boolean) {
    console.log("Validando maestro... ", data);
    // guardamos los textos de requerido si es email etc.
    let error: any = [];

    if (!this.validatorService.required(data["id_trabajador"])) {
      error["id_trabajador"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data["fecha_nacimiento"])) {
      error["fecha_nacimiento"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["rfc"])) {
      error["rfc"] = this.errorService.required;
    } else if (!this.validatorService.min(data["rfc"], 12)) {
      error["rfc"] = this.errorService.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    } else if (!this.validatorService.max(data["rfc"], 13)) {
      error["rfc"] = this.errorService.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["cubiculo"])) {
      error["cubiculo"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["area_investigacion"])) {
      error["area_investigacion"] = this.errorService.required;
    }

    if (data["materias_json"].length == 0) {
      error["materias_json"] = "Al menos debes elegir una materia";
      //alert("Debes seleccionar materias para poder registrarte.");
    }
    //Return arreglo
    return error;
  }

  /*Aquí van los servicios HTTP
    Servicio para registrar un nuevo usuario
    El /admin esta en la ruta urls.py de la api
    para pasar como peticion post
  */

  public registrarMaestros(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/maestros/`, data, httpOptions);
  }

  public obtenerListaMaestros(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-maestros/`, { headers: headers });
  }

  //Obtener un solo maestro dependiendo su ID
  public getMaestroByID(idUser: Number) {
    return this.http.get<any>(`${environment.url_api}/maestros/?id=${idUser}`, httpOptions);
  }


  //Servicio para actualizar un usuario
  public editarMaestro(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/maestros-edit/`, data, { headers: headers });
  }

  // Eliminar Maestro
  public eliminarMaestro(idUser: number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/maestros-edit/?id=${idUser}`, { headers: headers });
  }

}
