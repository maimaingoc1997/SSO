import { Routes } from '@angular/router';
import { CartComponent } from './pages/homepage/cart/cart/cart.component';
import { LoginComponent } from './pages/homepage/login/login/login.component';
import { ProductListComponent } from './pages/homepage/product-list/product-list.component';
import { TeaserComponent } from './pages/homepage/teaser/teaser.component';
export const routes: Routes = [

    {
        path: '',
        children: [
            { path: '', component: TeaserComponent, outlet: 'teaser' },
            { path: '', component: ProductListComponent, outlet: 'product-list' }
        ]
    },
    {path:'login', component:LoginComponent},
    {path:'cart', component:CartComponent}
    
];
