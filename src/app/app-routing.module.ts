import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { ListarMascotaComponent } from './components/listar-mascota/listar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  { path: '', redirectTo: 'listarMascotas', pathMatch: 'full' },
  { path: 'listarMascotas', component: ListarMascotaComponent },
  { path: 'agregarMascota', component: AgregarEditarMascotaComponent },
  { path: 'verMascota/:id', component: VerMascotaComponent },
  { path: 'editarMascota/:id', component: AgregarEditarMascotaComponent },
  { path: '**', redirectTo: 'listarMascotas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
