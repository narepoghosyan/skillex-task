import {createSlice} from '@reduxjs/toolkit'

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        selectedPriceRange: [1, 1000],
        selectedRatingRange: [1, 5],
        selectedCategory: '',
        selectedBrand: '',
        selectedName: ''
    },
    reducers: {
        setSelectedPriceRange(state, action) {
            state.selectedPriceRange = action.payload;
        },
        setSelectedRatingRange(state, action) {
            state.selectedRatingRange = action.payload;
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload
        },
        setSelectedBrand(state, action) {
            state.selectedBrand = action.payload
        },
        setSelectedName(state, action) {
            state.selectedName = action.payload
        },
        resetFilters(state) {
            state.selectedPriceRange = [1, 1000];
            state.selectedRatingRange = [1, 5];
            state.selectedCategory = '';
            state.selectedBrand = '';
            state.selectedName = '';
        }
    },
})

export const selectedPriceRange = (state) => state.filters.selectedPriceRange;
export const selectedRatingRange = (state) => state.filters.selectedRatingRange;
export const selectedCategory = (state) => state.filters.selectedCategory;
export const selectedBrand = (state) => state.filters.selectedBrand;
export const selectedName = (state) => state.filters.selectedName;

export const {
    setSelectedPriceRange, setSelectedRatingRange, setSelectedCategory, setSelectedBrand,
    setSelectedName, resetFilters
} = filtersSlice.actions
export default filtersSlice.reducer