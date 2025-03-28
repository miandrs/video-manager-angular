import { Component, Injectable, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Product } from '../models/product.model';

type Val = 1 | 2;

@Component({
  selector: 'app-card-product-view',
  standalone: false,
  
  templateUrl: './card-product-view.component.html',
  styleUrl: './card-product-view.component.scss'
})

export class CardProductViewComponent implements OnInit {
  @Input() homePage = false;
  @Input() shopPage = false;
  categoryClass = ['btn btn-default d-flex m-2 py-2 bg-light rounded-pill', 'btn btn-default d-flex m-2 py-2 bg-light rounded-pill active']; 
  categoryClassShop = ['btn btn-default d-flex m-2 py-2', 'btn btn-default d-flex m-2 py-2 border-bottom'];  
  valActive: Val = 2;
  valDefault: Val = 1; 
  valClicked: Val = 2;
  idClicked = -1;
  shownCategory = 'All';
  //paginator
  totalItems = 0;
  pageIndex = 0;
  pageSize = 9;
  pageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //paginator
  @Input() price = 0;
  categories!: any[];
  products!: any[];

  productSubscription!: Subscription;
  categorySubscription!: Subscription;
  constructor(private productService: ProductService, private categoryService: CategoryService) {}
  
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productSubscription = this.productService.productSubject.subscribe((products: any[]) => {
      this.products = products;
      this.totalItems = products.length-1;
    });
    this.categorySubscription = this.categoryService.categorySubject.subscribe((categories: any[]) => {
      this.categories = categories;
    });
    this.productService.emitProductSubject(this.pageIndex, this.pageSize);
    this.categoryService.emitCategorySubject();
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }

  onFindByCategory(category: Category, id: number) {
    this.products = this.productService.getProductsByCategory(category);
    this.shownCategory = category.name;
    this.valClicked = 2;
    this.valActive = 1;
    this.idClicked = id + 1; 
  }

  onFindAll() {
    this.productService.emitProductSubject(this.pageIndex, this.pageSize);
    this.shownCategory = 'All';
    this.valActive = 2;
    this.idClicked = -1;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
  }
}
