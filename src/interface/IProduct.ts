export interface IProduct{
    id?:number;
    name:string;
    price:number;
    image?:string;
    description?:string;
    categoryID?:string|number;
    rating?: number;
    stock?: number;
    brand?: string;
    discountPercentage: number;
}