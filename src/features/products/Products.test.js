import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
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

        mockProducts.forEach(product => {
            expect(screen.getByText(product.name)).toBeInTheDocument();
        });
    });

    test('renders message when no products are found', () => {
        render(<ProductsTableWithProvider products={[]}/>);

        expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });

    test('sorts products by price in ascending order', () => {
        render(<ProductsTableWithProvider products={mockProducts}/>);

        fireEvent.click(screen.getByTestId('sort-by-price'));

        const productNames = screen.getAllByTestId('product-name').map(el => el.textContent);
        expect(productNames).toEqual(['Bluetooth Speaker', 'Running Shoes', 'Wireless Headphones']);
    });

    test('sorts products by name in ascending order', () => {
        render(<ProductsTableWithProvider products={mockProducts}/>);

        fireEvent.click(screen.getByTestId('sort-by-name'));

        const productNames = screen.getAllByTestId('product-name').map(el => el.textContent);
        expect(productNames).toEqual(['Bluetooth Speaker', 'Running Shoes', 'Wireless Headphones']);
    });
});