import { Observable, Subject } from "rxjs";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductService {
    productSubject = new Subject<any[]>();
    private products: Product[] = [];
    protected productApi = 'http://localhost:80/api/media';

    constructor(private httpClient: HttpClient) {}

    emitProductSubject(start: number, end: number) {
        this.productSubject.next(this.products.slice());
    }

    getProducts() {
        this.httpClient.get< Product[] >(this.productApi)
        .subscribe(
            (data) => {
                this.products = data;
            },
            (error) => {
                return 'Error while loading Products data '+error;
            }
        );
    }

    addProduct(formData: FormData ) { 
        this.httpClient.post(this.productApi, formData)
        .subscribe(
            (response) => {
                this.getProducts();
                return response;
            },
            (error) => {
                return 'Error while saving Product '+error;
            }
        );
    }

    updateProduct(id: string, formData: FormData ) { 
        this.httpClient.put(`${this.productApi}/${id}`, formData)
        .subscribe(
            (response) => {
                this.getProducts();
                return response;
            },
            (error) => {
                return 'Error while updating Product '+error;
            }
        );
    }

    deleteProduct(id: string): Observable<any> {
        return this.httpClient.delete(`${this.productApi}/${id}`);
    }

    getProductById(id: string) {
        let product!: Product;
        const productMap = this.products.filter(
            (product: Product) => product._id === id).map((item: Product) => {
              return product = new Product(
              item._id,
              item.title,
              item.description,
              item.imageUrl,
              item.videoUrl,
              item.category,
              item.userId);
            }
        );
        return product;
    }

    getProductsByCategory(category: Category) {
        let productList: Product[] = [];
        for(let i = 0; i < this.products.length; i++) {
            if(this.products[i].category._id === category._id) {
                productList.push(this.products[i]);
            }
        }
        return productList;
    }

    getProductByUserId(id: string) {
        let productList: Product[] = [];
        for(let i = 0; i < this.products.length; i++) {
            if(this.products[i].userId === id) {
                productList.push(this.products[i]);
            }
        }
        return productList;
    }
}