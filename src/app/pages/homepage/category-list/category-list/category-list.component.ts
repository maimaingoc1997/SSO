import { Component, OnInit, NgModule } from '@angular/core';
import { Category } from '../../../../shared/models/category/category.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CategoryService } from '../../../../services/category.service';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],


  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          console.log(categories);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }
}

    this.categoryService.getAllCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          console.log(categories);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }
}

