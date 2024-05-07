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
export class MateriasService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ){}

  // Método para obtener el token de autenticación
  private getToken(): string {
    return this.facadeService.getSessionToken();
  }

  // Falta mi horario en el esquema
  public esquemaMateria(){
    return {
      'nrc': '',
      'name_materia': '',
      'seccion': '',
      'salon': '',
      'programa_educativo': '',
      'hora_inicio': '',
      'hora_final': '',
      'dias_json': []
    }
  }

  validarMateria(materia: any, editar: boolean): string[] {
    console.log("Validando materia... ", materia);
    // guardamos los textos de requerido si es nrc etc.
    // let errors: any = [];
    const errors: string[] = [];

    // Validar que el NRC sea numérico
    if (!this.validatorService.required(materia['nrc'])) {
      errors["nrc"] = this.errorService.required;
    } else if (!this.validatorService.numeric(materia['nrc'])) {
      errors["nrc"] = "El NRC debe ser numerico";
    }

    if (!this.validatorService.required(materia['name_materia'])) {
      errors["name_materia"] = this.errorService.required;
    }

    // Validar que la sección sea numérica
    if (!this.validatorService.required(materia['seccion'])) {
      errors["seccion"] = this.errorService.required;
    } else if (!this.validatorService.numeric(materia['seccion'])) {
      errors["seccion"] = "La seccion debe ser numerica";
    }

    if (!this.validatorService.required(materia['salon'])) {
      errors["salon"] = this.errorService.required;
    }

    if (!this.validatorService.required(materia["programa_educativo"])) {
      errors["programa_educativo"] = this.errorService.required;
    }
    
    // TODO: PONER LA VALIDACION DEL HORARIO
    // Validar hora inicial
    if (!this.validatorService.required(materia['hora_inicio'])) {
      errors["hora_inicio"] = this.errorService.required;
    }

    // Validar hora final
    if (!this.validatorService.required(materia['hora_final'])) {
      errors["hora_final"] = this.errorService.required;
    }

    if (materia["dias_json"].length == 0) {
      errors["dias_json"] = "Al menos debes elegir una dia";
      //alert("Debes seleccionar materias para poder registrarte.");
    }

    return errors;
  }

  /*Aquí van los servicios HTTP
    Servicio para registrar un nuevo usuario
    El /admin esta en la ruta urls.py de la api
    para pasar como peticion post
  */

  // Método para crear las opciones de solicitud con el token de autenticación
  private getRequestOptions(): { headers: HttpHeaders } {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return { headers: headers };
  }

  // Método para registrar una materia
  public registrarMateria(materia: any): Observable<any> {
    const requestOptions = this.getRequestOptions();
    return this.http.post<any>(`${environment.url_api}/materias/`, materia, requestOptions);
  }

  public obtenerListaMaterias(): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(`${environment.url_api}/lista-materias/`, { headers: headers });
  }
  
}
