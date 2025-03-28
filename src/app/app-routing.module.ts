import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AuthGuard } from './services/auth-guard.service';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop', canActivate: [AuthGuard], component: ShopComponent },
  { path: 'shop/:id', canActivate: [AuthGuard], component: ShopDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: AuthFormComponent },
  { path: 'login', component: AuthFormComponent },
  { path: 'product', canActivate: [AuthGuard], component: ProductFormComponent },
  { path: 'not-found', component: Page404Component },
  { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
