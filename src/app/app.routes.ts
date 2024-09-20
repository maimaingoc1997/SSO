import { Routes } from '@angular/router';
import { Product } from './shared/models/product/product.model';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/homepage/product-list/product-list.component';
import { CategoryListComponent } from './pages/homepage/category-list/category-list/category-list.component';
import { TeaserComponent } from './pages/homepage/teaser/teaser.component';
import { LoginComponent } from './pages/homepage/login/login/login.component';
export const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', component: TeaserComponent, outlet: 'teaser' },
            { path: '', component: ProductListComponent, outlet: 'product-list' }
        ]
    },
    {path:'login', component:LoginComponent}
    
];
