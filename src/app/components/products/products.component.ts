import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/models/product.model';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsAPIService } from 'src/app/Services/products-api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productoRender: Product[] = [];
  createProduct: FormGroup;
  producto: string = '';
  limit = 8;
  skip = 30;

  constructor(
    private httpProducts: ProductsAPIService,
    private formsBuilder: FormBuilder
  ) {
    this.createProduct = this.formsBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discountPercentage: [
        '',
        [Validators.required, Validators.max(50), Validators.min(0)],
      ],
      rating: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
      stock: ['', [Validators.required, Validators.max(100)]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      //Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/) es para verificar que sea el patron de una URL no que la url sea valida
      thumbnail: [
        '',
        [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ],
      ],
      images: [
        '',
        [
          Validators.required,
          Validators.pattern(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/),
        ],
      ],
    });
  }
  //carga automatica de productos inicial
  ngOnInit(): void {
    this.httpProducts.getProducts(this.limit, this.skip).subscribe((data) => {
      this.productoRender = data.products;
      this.skip += this.limit;
      console.log(this.productoRender);
    });
  }
  //metodo para agregar productos, los agrega en la priera posicion del array
  datos() {
    const body = this.createProduct.value;

    this.httpProducts.createProduct(body).subscribe((data) => {
      this.productoRender?.unshift(data);
    });
  }
  // metodo para cargar mas datos desde la API
  loadMore() {
    this.httpProducts.getProducts(this.limit, this.skip).subscribe((data) => {
      this.productoRender = data.products;
      if (this.skip >= 100) {
        this.httpProducts.getProducts(8, 3).subscribe((data) => {
          this.productoRender = data.products;
        });
        this.skip = 0;
      } else {
        this.skip += this.limit;
      }
    });
  }

  //obtencion de los datos por cada input  para verificacion

  get titleField() {
    return this.createProduct.get('title');
  }
  get descriptionField() {
    return this.createProduct.get('description');
  }
  get priceField() {
    return this.createProduct.get('price');
  }
  get discountPercentageField() {
    return this.createProduct.get('discountPercentage');
  }
  get ratingField() {
    return this.createProduct.get('rating');
  }
  get stockField() {
    return this.createProduct.get('stock');
  }
  get brandField() {
    return this.createProduct.get('brand');
  }
  get categoryField() {
    return this.createProduct.get('category');
  }
  get thumbnailField() {
    return this.createProduct.get('thumbnail');
  }
  get imagesField() {
    return this.createProduct.get('images');
  }

  //metodos para validar informacion suministrada por el usuario de manera reactiva por cada campo

  get titleRequerido() {
    return this.titleField?.touched && this.titleField.hasError('required');
  }

  get descriptionRequerido() {
    return (
      this.descriptionField?.touched &&
      this.descriptionField.hasError('required')
    );
  }
  get priceRequerido() {
    return this.priceField?.touched && this.priceField.hasError('required');
  }
  get discountRequerido() {
    return (
      this.discountPercentageField?.touched &&
      this.discountPercentageField.hasError('required')
    );
  }
  get discountMonto() {
    return (
      this.discountPercentageField?.touched &&
      this.discountPercentageField.hasError('max')
    );
  }
  get discountMonto2() {
    return (
      this.discountPercentageField?.touched &&
      this.discountPercentageField.hasError('min')
    );
  }
  get ratingRequerido() {
    return this.ratingField?.touched && this.ratingField.hasError('required');
  }
  get rating() {
    return this.ratingField?.touched && this.ratingField.hasError('max');
  }
  get ratingMin() {
    return this.ratingField?.touched && this.ratingField.hasError('min');
  }
  get stockRequerido() {
    return this.stockField?.touched && this.stockField.hasError('required');
  }
  get stock() {
    return this.stockField?.touched && this.stockField.hasError('max');
  }
  get brandRequerido() {
    return this.brandField?.touched && this.brandField.hasError('required');
  }

  get categoryRequerido() {
    return (
      this.categoryField?.touched && this.categoryField.hasError('required')
    );
  }

  get thumbnailRequerido() {
    return (
      this.thumbnailField?.touched && this.thumbnailField.hasError('required')
    );
  }
  get thumbnail() {
    return (
      this.thumbnailField?.touched && this.thumbnailField.hasError('pattern')
    );
  }

  get imagesRequerido() {
    return this.imagesField?.touched && this.imagesField.hasError('required');
  }
  get images() {
    return this.imagesField?.touched && this.imagesField.hasError('pattern');
  }
}
