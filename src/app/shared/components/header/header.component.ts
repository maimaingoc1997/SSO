import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CategoryListComponent } from "../../../pages/homepage/category-list/category-list/category-list.component";
import { SearchComponent } from "../../../pages/search/search/search.component";
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../services/cart.service';
import { count } from 'console';


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
    CommonModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isSearchVisible: boolean = false;
  searchQuery: string = '';
  showFiller = false;
  isMenuActive: boolean = false;
  cartItemCount: number = 0;

  constructor(private router: Router,
     public authService: AuthService,
     private cartService: CartService,
      private cdr: ChangeDetectorRef) {
    this.getCartItemCount();

    this.cartService.cartItemCount$.subscribe((count) => {
      this.cartItemCount = count;
      this.cdr.detectChanges();
    })
  }
  getCartItemCount() {
    const userId = this.authService.getUserId();
    this.cartService.getCartItems(userId).subscribe(items => {
      this.cartItemCount = items.length;
    });
  }
  logout() {
    this.authService.logout();
    this.cartService.updateCartItemCount(0);
    this.router.navigate(['/']);
  }
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
