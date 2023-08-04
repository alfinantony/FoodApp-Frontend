import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllAboutComponent } from './all-about/all-about.component';
import { AllPortfolioComponent } from './all-portfolio/all-portfolio.component';
import { AllContactComponent } from './all-contact/all-contact.component';
import { AllViewComponent } from './all-view/all-view.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';




@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    AllAboutComponent,
    AllPortfolioComponent,
    AllContactComponent,
    AllViewComponent,
    WishlistComponent,
    CartComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class ProductsModule { }
