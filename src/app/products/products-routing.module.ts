import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllAboutComponent } from './all-about/all-about.component';
import { AllPortfolioComponent } from './all-portfolio/all-portfolio.component';
import { AllContactComponent } from './all-contact/all-contact.component';
import { AllViewComponent } from './all-view/all-view.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { 
    path: '', component: AllProductsComponent
  },
  {
    path: 'all-about', component: AllAboutComponent
  },
  {
    path: 'all-portfolio', component: AllPortfolioComponent
  },
  {
    path: 'all-view/:productId', component: AllViewComponent
  },
  {
    path: 'wishlist', component: WishlistComponent
  },
  {
    path: 'cart', component: CartComponent 
  },
  {
    path: 'all-contact', component: AllContactComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
