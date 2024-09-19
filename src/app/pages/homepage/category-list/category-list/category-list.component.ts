import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../shared/models/category/category.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [
    {
      id: 1,
      name: 'Women',
      description: "Clothes for women",
      parentId: 0,
      products: []
    },
    {
      id: 2,
      name: 'Men',
      description: "Clothes for men",
      parentId: 0,
      products: []
    },
    {
      id: 3,
      name: 'Kids',
      description: "Clothes for kids",
      parentId: 0,
      products: []
    },
    {
      id: 4,
      name: 'Home',
      description: "Beauty",
      parentId: 0,
      products: []
    },
  ];

  ngOnInit(): void {
    this.categories.push()
  }

}
