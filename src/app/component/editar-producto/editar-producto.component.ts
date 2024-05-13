import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  id!: number;
  nombre: string = '';
  descripcion: string = '';
  precio: string = '';
  mensaje: string = '';

  isAdmin = false;

  constructor(private authService:AuthService, private http: HttpClient, private router:Router, private route: ActivatedRoute, private productoService:ProductosService) { }

  ngOnInit(): void {

    const userRole = this.authService.getRole();


    if (userRole === 1) {
      this.isAdmin = true;
    } else if (userRole === 2) {
      this.isAdmin = false;
    }




    this.route.queryParams.subscribe(params => {
      this.id = +params['id_producto'];
    });

    this.productoService.getProducto(this.id).subscribe(
      (productos: any[]) => {
        if (productos.length > 0) {
          const producto = productos[0];
          this.nombre = producto.NOMBRE;
          this.descripcion = producto.DESCRIPCION;
          this.precio = producto.PRECIO;

        } else {
          console.log('No se encontró ningún producto con ID:', this.id);
        }
      },
      error => {
        console.error('Error al obtener los detalles del producto:', error);
      }
    );
  }



  async actualizarProducto(): Promise<void> {
    if (!this.nombre.trim() || !this.descripcion.trim()) {
      this.mensaje = "Faltan datos";
      return;
    }

    const data = {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio
    };

    try {
      this.productoService.updateProductos(data).subscribe(
        (res: any) => {
          console.log(res);
          this.mensaje = res.message;
          alert(res.message);
          this.router.navigate(['/productos']);
        },
        (err) => console.error('Error al actualizar el producto:', err)
      );
    } catch (error) {
      console.error('Error interno del servidor:', error);
      this.mensaje = "Error interno del servidor";
    }
  }



}
