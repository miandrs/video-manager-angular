import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card-product',
  standalone: false,
  
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() product!: Product;
  @Input() productIndex: number = 0;
  @Input() id: string = ''; 
  @Input() homePage: boolean = false;
}
