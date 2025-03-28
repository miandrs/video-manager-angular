import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Product } from '../models/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: false,
  
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  categories!: Category[];
  categorySubject!: Subscription;
  products!: Product[]; 
  formData = new FormData;
  response: any;
  isCreate: boolean = true;
  productId!: string;
  indexProduct!: number;

  constructor(private productService: ProductService, private categoryService: CategoryService, private formBuilder: FormBuilder, private sanitization: DomSanitizer) {}

  ngOnInit(): void {
    this.categorySubject = this.categoryService.categorySubject.subscribe((data: any[]) => {
      this.categories = data;
    });
    this.categoryService.emitCategorySubject();
    this.products = this.productService.getProductByUserId(this.getUserToken());
    this.initForm();
  }

  getUserToken() {
    const token = localStorage.getItem('_id');
    return token ? token : '';
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      poster: [null, this.isCreate ? [Validators.required] : [Validators.nullValidator]],
      video: [null, this.isCreate ? [Validators.required] : [Validators.nullValidator]]
    });
  }

  uploadFile(event: Event, fileType: string) {
    this.updateFileFormControl(event, fileType);
  }

  private updateFileFormControl(event: any, fileType: string) {
    let file: File = event.target.files[0];
    
    if(file) {
      if(this.formData.has(fileType==='poster'?'image':'video')) {
        this.formData.set(fileType==='poster'?'image':'video', file);  
      } else {
        this.formData.append(fileType==='poster'?'image':'video', file);
      }
    }
  }

  async onSaveOrUpdateProduct() {
    const formValue = this.productForm.value;
    const media = {
      title: formValue.name,
      description: formValue.description,
      userId: this.getUserToken(),
      category: formValue.category
    };
    this.formData.set('media', JSON.stringify(media));
    if(this.isCreate) {
      this.response = this.productService.addProduct(this.formData);
    } else {
      this.response = this.productService.updateProduct(this.productId, this.formData);
      this.products[this.indexProduct].title = formValue.title;
      this.products[this.indexProduct].description = formValue.description;
    }
    this.resetForm();
  }

  onEditForm(product: Product, index: number) {
    this.isCreate = false;
    this.indexProduct = index;
    this.initForm();
    this.productId = product._id;
    this.productForm.controls['name'].setValue(product.title);
    this.productForm.controls['description'].setValue(product.description);
    this.productForm.controls['category'].setValue(product.category._id);
  }

  newProduct() {
    this.isCreate = true;
    this.resetForm();
  }

  resetForm() {
    this.productForm.controls['name'].setValue('');
    this.productForm.controls['description'].setValue('');
    this.productForm.controls['category'].setValue('');
    this.productForm.controls['poster'].setValue('');
    this.productForm.controls['video'].setValue('');
    this.formData.delete('image');
    this.formData.delete('video');
  }

  async onDelProduct(id: string) {
    this.response = this.productService.deleteProduct(id);
  }

  ngOnDestroy(): void {
      this.categorySubject.unsubscribe();
  }

  getBackgroundPath(filePreviewUrl: string) {
    return this.sanitization.bypassSecurityTrustStyle('url(\'' + filePreviewUrl + '\')');
  }
}
