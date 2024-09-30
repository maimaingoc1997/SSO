import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CategoryListComponent } from "../../../pages/homepage/category-list/category-list/category-list.component";
import { SearchComponent } from "../../../pages/search/search/search.component";
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CategoryListComponent,
    RouterModule,
    SearchComponent,
    FormsModule,
    MatSidenavModule,
    MatIconButton,
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isSearchVisible: boolean = false;
  searchQuery: string = '';
  showFiller = false;
  isMenuActive: boolean = false;
  constructor(private productService: ProductService, private router: Router) { }


  // Get the elements
  // const hamMenu = document.querySelector('.ham-menu') as HTMLElement;
  // const offScreenMenu = document.querySelector('.off-screen-menu') as HTMLElement;

  // Ensure elements exist before adding event listeners

  toggleMenu() {
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const overlay = document.querySelector('.menu-overlay');
    console.log('Menu toggled');
    if (offScreenMenu && overlay) {
      offScreenMenu.classList.toggle('active');
      overlay.classList.toggle('active');
    }
  }
  toggleSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['search'], { queryParams: { query: this.searchQuery } });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
