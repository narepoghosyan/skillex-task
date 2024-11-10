import React from 'react';
import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {store} from "../../app/store";
import {Provider} from "react-redux";
import {Filters} from "./Filters";
import {ProductsTable} from "../products/Products";

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

beforeEach(() => {
    render(
        <Provider store={store}>
            <>
                <Filters/>
                <ProductsTable allProducts={mockProducts}/>
            </>
        </Provider>
    )
})

describe('Filters and ProductsTable integration', () => {
    test('filters products based on selected category', () => {
        fireEvent.change(screen.getByTestId('category'), {target: {value: 'Electronics'}});

        expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
        expect(screen.getByText("Bluetooth Speaker")).toBeInTheDocument();
        expect(screen.queryByText("Running Shoes")).not.toBeInTheDocument();
    });

    test('filters products by rating range', () => {
        const [min, max] = screen.getAllByLabelText('Rating range');

        fireEvent.change(min, {target: {value: 4.3}});
        fireEvent.change(max, {target: {value: 5}});

        expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
        expect(screen.queryByText("Bluetooth Speaker")).not.toBeInTheDocument();
        expect(screen.queryByText("Running Shoes")).not.toBeInTheDocument();
    });

    test('no products match the filter criteria', () => {
        fireEvent.change(screen.getByTestId('category'), {target: {value: 'Electronics'}});
        fireEvent.change(screen.getByTestId('brand'), {target: {value: 'Brand C'}});

        expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });
});