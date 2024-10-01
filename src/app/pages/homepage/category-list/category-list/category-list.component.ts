import { Component, OnInit, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../shared/models/category/category.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatSidenavModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  dataSource: Category[] = [];
  showFiller = false;
  selectedCategory: Category | null = null;

  childrenAccessor = (node: Category) => node.children || [];

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  constructor(private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.dataSource = buildCategoryTree(categories);
  
          // Only select the first category if no category is selected
          if (!this.selectedCategory && this.dataSource.length > 0) {
            this.selectedCategory = this.dataSource[0];
            this.categoryService.selectCategory(this.selectedCategory.id);  // Set first category as default
          }
  
          console.log('All categories loaded:', this.dataSource);
          console.log('Initially selected category:', this.selectedCategory);
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          console.error('Error fetching categories', error);
        }
      });
  }
  
  onCategoryClick(category: Category): void {
    // Check if the category has children
    if (this.hasChild(0, category)) {
      // Update only if a different category is selected
      if (this.selectedCategory?.id !== category.id) {
        this.selectedCategory = category;
        this.categoryService.selectCategory(category.id);
        console.log('Category with children selected:', this.selectedCategory);
      }
    } else {
      // Handle leaf node (category without children)
      if (this.selectedCategory?.id !== category.id) {
        this.selectedCategory = category;
        this.categoryService.selectCategory(category.id);
        console.log('Leaf category selected:', this.selectedCategory);
      }
    }
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
  

}

function buildCategoryTree(categories: Category[]): Category[] {
  const map: { [id: number]: Category } = {};

  categories.forEach(category => {
    map[category.id] = { ...category, children: [] };
  });

  const tree: Category[] = [];
  categories.forEach(category => {
    if (category.parentId === 0) {
      tree.push(map[category.id]); // Add root categories
    } else {
      const parent = map[category.parentId];
      if (parent) {
        parent.children?.push(map[category.id]); // Add child categories
      }
    }
  });

  return tree; // Return the structured tree
}