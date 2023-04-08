import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit{
  productoRenderform: Product[] | undefined = [];
  createProduct: FormGroup;

  constructor(
    private formsBuilder: FormBuilder,


  ) {
    this.createProduct = this.formsBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discountPercentage: ['0', [Validators.required, Validators.max(50)]],
      rating: ['0', [Validators.required, Validators.max(5)]],
      stock: ['1', [Validators.required, Validators.max(100)]],
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

  ngOnInit(): void {

  }

  datos() {
    const body = this.createProduct.value;


    console.log(this.productoRenderform);
  }

  get emailField() {
    return this.createProduct.get('title');
  }
}
