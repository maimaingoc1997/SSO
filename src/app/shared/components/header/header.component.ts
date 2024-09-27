import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, RouterModule, RouterLink, Router } from '@angular/router';
import { CategoryListComponent } from "../../../pages/homepage/category-list/category-list/category-list.component";
import { SearchComponent } from "../../../pages/search/search/search.component";
import { FormsModule } from '@angular/forms';
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
    FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSearchVisible: boolean = false;
  searchQuery: string = '';
  constructor(private productService: ProductService, private router: Router) { }

  toggleSearchBar() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['search'], { queryParams: { query: this.searchQuery } });
    }
  }

}
