import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { PackageListComponent } from '../package-list/package-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent, PackageListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
