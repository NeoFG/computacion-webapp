import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { AdministradorService } from 'src/app/services/administrador.service';
import { FacadeService } from 'src/app/services/facade.service';
import { MaestrosService } from 'src/app/services/maestros.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-materias-screen',
  templateUrl: './materias-screen.component.html',
  styleUrls: ['./materias-screen.component.scss']
})
export class MateriasScreenComponent implements OnInit{

  public name_user: string = "";
  public rol: string = "";
  public token: string = "";
  public lista_materias: any[] = [];

  //Para la tabla
  displayedColumns: string[] = ['nrc', 'name_materia', 'seccion', 'salon', 'programa_educativo', 'hora_inicio', 'hora_final', 'editar', 'eliminar'];

  // Interfaz de angular <DatosMateria>
  dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public facadeService: FacadeService,
    private administradoresService: AdministradorService,
    public maestrosService: MaestrosService,
    public materiasService: MateriasService,
    private router: Router,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.name_user = this.facadeService.getUserCompleteName();
    this.rol = this.facadeService.getUserGroup();
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    if (this.token == "") {
      this.router.navigate([""]);
    }
    //Obtener maestros
    this.obtenerMaterias();
    //Para paginador
    this.initPaginator();
  }

  //Funcion para editar
  public goEditar(idUser: number) {
    // this.router.navigate(["registro-usuarios/maestro/" + idUser]);
  }

  public delete(idUser: number) {
    // console.log("User:",idUser);
    /*const dialogRef = this.dialog.open(EliminarUserModalComponent, {
      data: { id: idUser, rol: 'maestro' },
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isDelete) {
        console.log("Maestro eliminado");
        // Recarga la pagina
        window.location.reload();
      } else {
        alert("Maestro no eliminado");
        console.log("No se elimino el Maestro");
      }
    });*/
  }

  //Para paginación
  public initPaginator() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    }, 500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  //Obtener materias
  public obtenerMaterias() {
    this.materiasService.obtenerListaMaterias().subscribe(
      (response) => {
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if (this.lista_materias.length > 0) {
          console.log("Materias: ", this.lista_materias);

          this.dataSource = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
        }
      }, (error) => {
        alert("No se pudo obtener la lista de materias");
      }
    );
  }


}

//Esto va fuera de la llave que cierra la clase
export interface DatosMateria {
  nrc: number,
  name_materia: string;
  seccion: number;
  salon: string;
  programa_educativo: string;
  hora_inicio: string;
  hora_final: string;
}