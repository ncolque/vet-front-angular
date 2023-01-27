import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-listar-mascota',
  templateUrl: './listar-mascota.component.html',
  styleUrls: ['./listar-mascota.component.css'],
})
export class ListarMascotaComponent implements OnInit, AfterViewInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _mascotaService: MascotaService
  ) {}

  displayedColumns: string[] = [
    'nombre',
    'edad',
    'raza',
    'color',
    'peso',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Paginas';
    }
  }

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerMascotas() {
    this.loading = true;
    this._mascotaService.getMascotas().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => (this.loading = false),
      complete: () => console.log('complete'),
    });
  }

  eliminarMascota(id: number) {
    this.loading = true;
    this._mascotaService.deleteMascota(id).subscribe(() => {
      this.mensajeExito();
      this.loading = false;
      this.obtenerMascotas();
    });
  }

  mensajeExito() {
    this._snackBar.open('La mascota fue eliminada', '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }
}
