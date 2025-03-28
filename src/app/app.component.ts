import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Media-Manager';
  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
      this.productService.getProducts();
      this.categoryService.getCategories();
  }
}
