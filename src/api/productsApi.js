import {productsData} from "../data/products";

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productsData);
        }, 1500);
    });
}
