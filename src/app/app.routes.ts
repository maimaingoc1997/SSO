import { Routes } from '@angular/router';
import { CartComponent } from './pages/homepage/cart/cart/cart.component';
import { ProductListComponent } from './pages/homepage/product-list/product-list.component';
import { TeaserComponent } from './pages/homepage/teaser/teaser.component';
import { WishlistComponent } from './pages/homepage/wishlist/wishlist.component';
import { SearchComponent } from './pages/search/search/search.component';


import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: TeaserComponent, outlet: 'teaser' },
            { path: '', component: ProductListComponent, outlet: 'product-list' },
        ]
    },
    { path: 'cart', component: CartComponent },
    { path: 'wishlist', component: WishlistComponent },
    { 
        path: 'search', 
        component: SearchComponent 
    },
    {
        path: ':category',
        children: [
            { path: '', component: TeaserComponent, outlet: 'teaser' },
            { path: '', component: ProductListComponent, outlet: 'product-list' }
        ]
    },
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
];
