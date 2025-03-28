import { Category } from "./category.model"

export class Product {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public imageUrl: string,
        public videoUrl: string,
        public category: Category,
        public userId: string) {}
}