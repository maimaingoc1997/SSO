import { Routes } from '@angular/router';
import { Product } from './shared/models/product/product.model';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/homepage/product-list/product-list.component';
import { CategoryListComponent } from './pages/homepage/category-list/category-list/category-list.component';
import { TeaserComponent } from './pages/homepage/teaser/teaser.component';

import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
export const routes: Routes = [
    // {path:'', component:ProductListComponent, outlet: 'product-list'},
    // {path:'', component:TeaserComponent, outlet: 'teaser'},
    {
        path: '',
        children: [
            { path: '', component: TeaserComponent, outlet: 'teaser' },
            { path: '', component: ProductListComponent, outlet: 'product-list' }
        ]
    },
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
];
