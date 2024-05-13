import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ProductosComponent } from './component/productos/productos.component';
import { CrearProductosComponent } from './component/crear-productos/crear-productos.component';
import { EditarProductoComponent } from './component/editar-producto/editar-producto.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
  {path: 'crear-producto',component: CrearProductosComponent, canActivate: [AuthGuard]},
  {path: 'editar-producto', component: EditarProductoComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
