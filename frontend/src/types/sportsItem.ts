import {categories} from "./categories";

export type sportsItemType = {
    id: string;
    name: string;
    brand: string;
    price: number | string;
    year: number | string;
    image: string;
    amount: number;
    category: categories;

}