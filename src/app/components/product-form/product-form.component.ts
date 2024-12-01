import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm: FormGroup;
  products: Product[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar todos los productos desde el servicio
  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  // Crear un nuevo producto
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: 0, // Se asignará en el servicio
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        amount: this.productForm.value.amount,
      };
      this.productService.createProduct(newProduct);
      this.loadProducts(); // Recargar la lista de productos
      this.productForm.reset(); // Limpiar el formulario
    }
  }

  // Editar un producto existente
  onEdit(product: Product): void {
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      amount: product.amount,
    });
    this.productService.updateProduct(product);
    this.loadProducts();
  }

  // Borrar un producto
  onDelete(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts(); // Recargar la lista de productos
  }

  hasErrors(controlname: string, errorType: string) {
    const control = this.productForm.get(controlname);
    return control?.hasError(errorType) && control?.touched;
  }
}
