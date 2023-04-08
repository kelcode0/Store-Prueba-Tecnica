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

  getProducts(limit: number, skip: number) {
    return this.http.get<ProductsAll>(this.API, { params: { limit, skip } });
  }

  createProduct(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.API}/add`, dto);
  }

  updateProduct(update: CreateProductDTO, id: number) {
    return this.http.put<Product>(`${this.API}/${id}`, update);
  }

  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.API}/${id}`)
  }
}
