import { Product } from "./product";

export interface Package {
    id: number;
    packageName: string;
    shippingCost: number;
    products: Product[];
    totalCost: number;
}