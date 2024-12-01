import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageKey = 'products';

  constructor() { }

  // Obtener todos los productos
  getProducts(): Product[] {
    const products = localStorage.getItem(this.storageKey);
    return products ? JSON.parse(products) : [];
  }

  // Crear un nuevo producto
  createProduct(product: Product): void {
    const products = this.getProducts();
    product.id = new Date().getTime(); // Generar un ID único usando el timestamp
    products.push(product);
    this.saveProducts(products);
  }

  // Actualizar un producto
  updateProduct(updatedProduct: Product): void {
    let products = this.getProducts();
    products = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    this.saveProducts(products);
  }

  // Borrar un producto
  deleteProduct(id: number): void {
    let products = this.getProducts();
    products = products.filter((product) => product.id !== id);
    this.saveProducts(products);
  }

  // Guardar los productos en localStorage
  private saveProducts(products: Product[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
}