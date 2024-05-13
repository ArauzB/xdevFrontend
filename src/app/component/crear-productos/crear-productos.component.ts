import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {

  nombre: string = '';
  descripcion: string = '';
  precio: string = '';
  mensaje: string = '';

  isAdmin = false;

  constructor(private authService:AuthService, private http: HttpClient, private router:Router, private productoService:ProductosService) { }

  ngOnInit(): void {
    const userRole = this.authService.getRole();


    if (userRole === 1) {
      this.isAdmin = true;
    } else if (userRole === 2) {
      this.isAdmin = false;
    }
  }




  async crearProducto(): Promise<void> {
    if (!this.nombre.trim() || !this.descripcion.trim()) {
      this.mensaje = "Faltan datos";
      return;
    }

    const data = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio
    };

    try {
      this.productoService.createProductos(data).subscribe(
        (res: any) => {
          console.log(res);
          this.mensaje = res.message;
          alert(res.message);
          this.router.navigate(['/productos']);
        },
        (err) => console.log(err)
      );

    } catch (error) {
      console.error(error);
      this.mensaje = "Error interno del servidor";
    }
  }



}



