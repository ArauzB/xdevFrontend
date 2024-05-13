import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  isAdmin = false;

  productos!: any[];

  carrito={
    id_producto: '',
    token: localStorage.getItem('token'),
    precio: 0,
  }

  constructor(private authService:AuthService, private productoService:ProductosService, private router:Router) { }

  ngOnInit(): void {

    const userRole = this.authService.getRole();


    if (userRole === 1) {
      this.isAdmin = true;
    } else if (userRole === 2) {
      this.isAdmin = false;
    }





    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log(this.productos);
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );

  }


 actualizarProducto(idProducto: number): void {
  this.router.navigate(['/editar-producto'], { queryParams: { id_producto: idProducto} });
}

eliminarProducto(id: number): void {
  this.productoService.deleteProducto(id).subscribe(
    (data) => {
      this.ngOnInit();
    },
    (error) => {
      console.error('Error al obtener los productos', error);
    }
  );


}


exportToExcel(): void {
  const excelData = this.productos
    .filter(producto => producto.ESTADO === 1) // Filtra solo los productos con estado 1 (activo)
    .map(({ NOMBRE, DESCRIPCION, PRECIO }) => ({ Nombre: NOMBRE, Descripción: DESCRIPCION, Precio: PRECIO }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  // Convertir el buffer de Excel en un Blob
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Crear un objeto URL para el Blob
  const blobURL = URL.createObjectURL(blob);

  // Crear un enlace temporal
  const a = document.createElement('a');
  a.href = blobURL;
  a.download = 'productos.xlsx';

  // Hacer clic en el enlace para iniciar la descarga
  document.body.appendChild(a);
  a.click();

  // Limpiar y remover el enlace después de la descarga
  document.body.removeChild(a);
  URL.revokeObjectURL(blobURL);
}




}


