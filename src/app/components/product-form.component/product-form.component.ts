import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProductService} from '../../product-service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Product} from '../../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  productForm : FormGroup;
  isEditMode : boolean = false;
  productId : number | null = null;

  //Injection des dépendances via le constructeur
  constructor(
    private productService : ProductService,
    private fb: FormBuilder,
    private router : Router,
    private route : ActivatedRoute) {

    this.productForm = this.fb.group({
      name : ['', [Validators.required, Validators.minLength(3)]],
      price : ['', [Validators.required, Validators.min(0.01)]],
      stock : ['null', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    // On vérifie si on est en mode édition en regardant l'URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.productId = +id;
        this.productService.getProductById(this.productId).subscribe(product => {
          this.productForm.patchValue(product);
      });
    }
  });
}

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    if (this.isEditMode && this.productId) {
      const updatedProduct: Product = { id: this.productId, ...this.productForm.value };
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.addProduct(this.productForm.value).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  // Petites fonctions pour un accès facile aux contrôles du formulaire dans le template
  get name() { return this.productForm.get('name'); }
  get price() { return this.productForm.get('price'); }
  get description() { return this.productForm.get('description'); }
  get imageUrl() { return this.productForm.get('imageUrl'); }
  get stock() { return this.productForm.get('stock'); }
}
