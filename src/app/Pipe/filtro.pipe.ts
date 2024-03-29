import { Pipe, PipeTransform } from '@angular/core';
import { Product, ProductsAll } from '../models/product.model';

@Pipe({
  name: 'filtro',
})
//Pipe configurado para filtrar por el titulo  se puede modificar cambiendo la propiedad data.title por los que necesitemos filtar
export class FiltroPipe implements PipeTransform {
  transform(product: Product[], buscar: string): Product[] {
    if (buscar.length === 0) {
      return product;
    }

    const prodcutosFiltrados = product.filter((data) =>
      data.title.toLowerCase().includes(buscar.toLowerCase())
    );
    return prodcutosFiltrados;
  }
}
