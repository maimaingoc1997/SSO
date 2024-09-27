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


  childrenAccessor = (node: Category) => node.children || [];

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  constructor(private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.dataSource = buildCategoryTree(categories)
          console.log(this.dataSource);
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          console.error(error);
        }
      });

  }



  onCategoryClick(categoryId: number): void {
    this.categoryService.selectCategory(categoryId);  // Update the selected category
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