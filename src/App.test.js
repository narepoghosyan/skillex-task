import {render, screen} from '@testing-library/react';
import App from './App';
import {store} from "./app/store";
import {Provider} from "react-redux";
import React from "react";

const AppWithProvider = () => {
    return <Provider store={store}><App/></Provider>
}

test('renders Products Catalog', () => {
    render(<AppWithProvider/>);
    const element = screen.getByText(/product catalog/i);
    expect(element).toBeInTheDocument();
});
