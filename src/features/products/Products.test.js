import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {store} from "../../app/store";
import {ProductsTable} from "./Products";
import {Provider} from "react-redux";

const mockProducts = [
    {
        "id": 1,
        "name": "Wireless Headphones",
        "category": "Electronics",
        "brand": "Brand A",
        "price": 99.99,
        "rating": 4.5,
    },
    {
        "id": 2,
        "name": "Bluetooth Speaker",
        "category": "Electronics",
        "brand": "Brand B",
        "price": 49.99,
        "rating": 4.0,
    },
    {
        "id": 3,
        "name": "Running Shoes",
        "category": "Footwear",
        "brand": "Brand C",
        "price": 59.99,
        "rating": 4.2,
    }
];

const ProductsTableWithProvider = ({products}) => {
    return (
        <Provider store={store}><ProductsTable allProducts={products}/></Provider>
    )
}

describe('ProductsTable Component', () => {
    test('renders product catalog with provided products', () => {
        render(<ProductsTableWithProvider products={mockProducts}/>);

        // Check if each product's name is displayed
        mockProducts.forEach(product => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
        });
    });

    test('renders message when no products are found', () => {
        render(<ProductsTableWithProvider products={[]}/>);

        // Check if no products message is displayed
        expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });
});