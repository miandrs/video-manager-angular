import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productCategory: Category[] = [];
  selectedImage!: string;

  changeImage(img: string) {
    this.selectedImage = img;
  }

  constructor(private categoryService: CategoryService, private sanitization: DomSanitizer) {}

  ngOnInit() {
    this.getGategories();    
  }

  categorySubject!: Subscription;
  getGategories() {
    this.categorySubject = this.categoryService.categorySubject.subscribe((categories: any[]) => {
      this.productCategory = categories;
    });
    this.categoryService.emitCategorySubject();
  }

  ngOnDestroy() {
    this.categorySubject.unsubscribe();
  }
  
  getBackgroundPath(filePreviewUrl: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }
}
