// @ts-ignore

import { Injectable } from '@angular/core';
import {Product} from './product.model';
import {Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {id: 1, name: 'Clavier sans fil', price: 5000, stock: 10},
    {id: 2, name: 'Ordinateur portable', price: 450000, stock: 5},
    {id: 3, name: 'Smartphone', price: 120000, stock: 30},
    {id: 4, name: 'Casque Audio', price: 25000, stock: 5},
    {id: 5, name: 'Batterie HP', price: 40000, stock: 5},
    {id: 6, name: 'Ordinateur de bureau DELL', price: 300000, stock: 5}
  ];

  private nextId : number = 7;

  constructor() { }

  // Récupérer tous les produits
  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  // Récupérer un produit par son ID
  getProductById(id: number): Observable<Product> {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return of(product);
    }
    return throwError(() => new Error('Produit introuvable'));
  }

  // Ajouter un nouveau produit
  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: this.nextId++
    };
    this.products.push(newProduct);
    return of(newProduct);
  }

  // Mettre à jour un produit
  updateProduct(updatedProduct: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      return of(updatedProduct);
    }
    return throwError(() => new Error('Produit introuvable pour la mise à jour'));
  }

  // Supprimer un produit
  deleteProduct(id: number): Observable<{}> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return of({}); // On retourne un objet vide pour signifier le succès
    }
    return throwError(() => new Error('Produit introuvable pour la suppression'));
  }
}
