import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselHolderComponent } from './carousel-holder/carousel-holder.component';
import { CardProductComponent } from './card-product/card-product.component';
import { CardProductViewComponent } from './card-product-view/card-product-view.component';
import { ProductService } from './services/product.service';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { ShopComponent } from './shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryService } from './services/category.service';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ContactService } from './services/contact.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CarouselHolderComponent,
    CardProductComponent,
    CardProductViewComponent,
    FooterComponent,
    ShopComponent,
    ShopDetailComponent,
    ContactComponent,
    AuthFormComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule.withConfig({ssrObserveBreakpoints: ['xs', 'lt-md']}),
    MaterialModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,  
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    ProductService,
    CategoryService,
    AuthService,
    AuthGuard,
    ContactService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
