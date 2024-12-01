import { Routes } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { PackageFormComponent } from './components/package-form/package-form.component';
import { PackageListComponent } from './components/package-list/package-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create-package', component: PackageFormComponent },
    { path: 'create-products', component: ProductFormComponent },
    { path: '**', redirectTo: '' },
];

