import { Component, OnInit } from '@angular/core';
import { Package } from '../../models/package';
import { PackageService } from '../../service/package.service';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.css'
})
export class PackageListComponent implements OnInit {
  packages: Package[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packages = this.packageService.getPackages().map((pkg) => {
      const shippingCostPerProduct = pkg.shippingCost / pkg.products.length;
      pkg.products = pkg.products.map((product) => ({
        ...product,
        finalPrice: parseFloat((product.price + shippingCostPerProduct).toFixed(2)),
      }));
      return pkg;
    });
  }

  onDeletePackage(packageId: number): void {
    this.packageService.deletePackage(packageId);
    this.loadPackages();
  }
}