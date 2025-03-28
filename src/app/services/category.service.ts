import { Subject } from "rxjs";
import { Category } from "../models/category.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryService {
    categorySubject = new Subject<any[]>();
    private categories: Category[] = [];
    protected categoryApi = 'http://localhost:80/api/category';

    constructor(private httpClient: HttpClient) {}
    
    emitCategorySubject() {
        this.categorySubject.next(this.categories.slice());
    }

    addCategory(category: Category) {
        const headers = { 'Content-Type': 'application/json' };
        this.httpClient.post(this.categoryApi, category, { headers })
        .subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log('Error while saving Category '+error);
            }
        );
    }

    getCategories() {
        this.httpClient.get< Category[] >(this.categoryApi)
        .subscribe(
            (data) => {
                this.categories = data;
            },
            (error) => {
                console.log('Error while loading data '+error);
            }
        );
        return this.categories;
    }
}