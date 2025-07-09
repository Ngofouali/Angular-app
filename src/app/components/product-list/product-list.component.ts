import {Component, OnInit} from '@angular/core';
import {Product} from '../../product.model';
import {RouterLink} from '@angular/router';
import {ProductService} from '../../product-service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchProduct: string = '';

  //Injection des dépendances
  constructor(private productService : ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products= products;
      this.filteredProducts = products;
    });
  }

  deleteProduct(id: number) {
    if (confirm('Etes-vous sûr de vouloir supprimer ce produits ?')) {
      this.productService.deleteProduct(id).subscribe(()=> {
        // On recharge la liste des produits après suppression
        this.loadProducts();
      });
    }
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchProduct.toLowerCase())
    );
  }

}
