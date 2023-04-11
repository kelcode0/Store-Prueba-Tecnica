import { Component, NgModule, createPlatform } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',

    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ProductsComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
