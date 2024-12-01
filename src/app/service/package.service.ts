import { Injectable } from '@angular/core';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private storageKey = 'packages';

  constructor() {}

  getPackages(): Package[] {
    const packages = localStorage.getItem(this.storageKey);
    return packages ? JSON.parse(packages) : [];
  }

  createPackage(newPackage: Package): void {
    const packages = this.getPackages();
    packages.push(newPackage);
    this.savePackages(packages);
  }

  deletePackage(packageId: number): void {
    let packages = this.getPackages();
    packages = packages.filter((pkg) => pkg.id !== packageId);
    this.savePackages(packages);
  }

  private savePackages(packages: Package[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(packages));
  }
}