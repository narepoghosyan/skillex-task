import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getProducts} from "../../api/productsApi";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        isFetching: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isFetching = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isFetching = false;
            });
    },
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await getProducts();
    return response;
});

export const products = (state) => state.products.products;
export const isFetching = (state) => state.products.isFetching;

export const {todoAdded, todoToggled} = productsSlice.actions
export default productsSlice.reducer