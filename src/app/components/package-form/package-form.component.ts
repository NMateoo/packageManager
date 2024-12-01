import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { PackageService } from '../../service/package.service';
import { ProductService } from '../../service/product.service';
import { Package } from '../../models/package';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './package-form.component.html',
  styleUrl: './package-form.component.css'
})
export class PackageFormComponent {
  packageForm: FormGroup;
  products: Product[] = [];
  selectedProducts: Product[] = [];
  totalCost: number = 0;

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private productService: ProductService
  ) {
    this.packageForm = this.fb.group({
      packageName: ['', [Validators.required]],
      shippingCost: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  onAddProduct(product: Product): void {
    if (!this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product);
      this.updateTotalCost();
    }
  }

  onRemoveProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter(
      (product) => product.id !== productId
    );
    this.updateTotalCost();
  }

  onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
  }

  updateTotalCost(): void {
    const shippingCost = this.packageForm.value.shippingCost || 0;
    const productCost = this.selectedProducts.reduce(
      (sum, product) => sum + product.price * product.amount,
      0
    );
    this.totalCost = productCost + shippingCost;
  }

  onSubmit(): void {
    if (this.packageForm.valid && this.selectedProducts.length > 0) {
      const newPackage: Package = {
        id: new Date().getTime(), // Unique ID using timestamp
        packageName: this.packageForm.value.packageName,
        shippingCost: this.packageForm.value.shippingCost,
        products: this.selectedProducts,
        totalCost: this.totalCost,
      };
      this.packageService.createPackage(newPackage);
      this.packageForm.reset();
      this.selectedProducts = [];
      this.totalCost = 0;
    }
  }
}