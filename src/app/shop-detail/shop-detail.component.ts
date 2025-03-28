import { Component, Injectable, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-detail',
  standalone: false,
  
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.scss'
})
@Injectable()
export class ShopDetailComponent implements OnInit {
  product!: Product;
  categories!: Category[];
  products!: any[];

  constructor(private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute, private sanitization: DomSanitizer) {}
  ngOnInit() {
    const item = this.onFindById();
    this.product = item;
    this.onFindByCategory(item.category);
    this.getGategories();
  }

  categorySubject!: Subscription;
  getGategories() {
    this.categorySubject = this.categoryService.categorySubject.subscribe((categories: any[]) => {
      this.categories = categories;
    });
    this.categoryService.emitCategorySubject();
  }

  onFindByCategory(category: Category) {
    this.products = this.productService.getProductsByCategory(category);
  }

  onFindById() {
    const id = this.route.snapshot.params['id'];
    return this.productService.getProductById(id);
  }

  getBackgroundPath(filePreviewUrl: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }

  ngOnDestroy() {
    this.categorySubject.unsubscribe();
  }
}
