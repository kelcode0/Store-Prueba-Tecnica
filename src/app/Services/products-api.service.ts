import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  ProductsAll,
  CreateProductDTO,
  Product,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsAPIService {
  private API = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}
  //servicio configurado para obtener productos segun paginacion enviada
  getProducts(limit: number, skip: number) {
    return this.http.get<ProductsAll>(this.API, { params: { limit, skip } });
  }
  //servicio configurado para Crear Productos
  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.API}/add`, dto);
  }
  //servicio configurado para actualizar información de un producto
  updateProduct(update: CreateProductDTO, id: number) {
    return this.http.put<Product>(`${this.API}/${id}`, update);
  }
  // //servicio COnfigurado para eliminar un producto
  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.API}/${id}`);
  }
}
