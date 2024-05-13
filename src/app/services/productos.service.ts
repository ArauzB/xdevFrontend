import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private readonly BASE_URL = environment.API_URL; // URL de tu backend
  private readonly GET_PRODUCTOS = `${this.BASE_URL}/productos/getAllProducto`;
  private readonly CREATE_PRODUCTOS = `${this.BASE_URL}/productos/createProducto`;
  private readonly UPDATE_PRODUCTOS = `${this.BASE_URL}/productos/editProducto`;
  private readonly DELETE_PRODUCTO = `${this.BASE_URL}/productos/deleteProducto`
  private readonly GET_PRODUCTO = `${this.BASE_URL}/productos/getProducto`;

  constructor(private http: HttpClient, private router:Router) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(this.GET_PRODUCTOS);
  }

  createProductos(productos: any): Observable<any> {
    return this.http.post<any>(this.CREATE_PRODUCTOS, productos);
  }

  updateProductos(productos: any): Observable<any> {
    return this.http.post<any>(this.UPDATE_PRODUCTOS, productos);
  }

  deleteProducto(id:any): Observable<any>{
    return this.http.post<any>(this.DELETE_PRODUCTO,{id});
  }

  getProducto(id: any): Observable<any> {
    return this.http.post<any>(this.GET_PRODUCTO, {id} );
  }



}
