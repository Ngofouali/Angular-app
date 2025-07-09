import { Routes } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';

export const routes: Routes = [
  {path : '', redirectTo : '/products', pathMatch: 'full'},
  {path : 'products', component : ProductListComponent},
  /*{path : 'products/new', component : ProductFormComponent},
  {path : 'products/edit/:id', component : ProductForm},
  {path : 'products/:id', component : ProductDetail}*/
];
