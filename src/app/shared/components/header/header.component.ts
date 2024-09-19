import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet, Route,RouterModule, RouterLink } from '@angular/router';
import { CategoryListComponent } from "../../../pages/homepage/category-list/category-list/category-list.component";
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule, 
    CategoryListComponent,
    RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
