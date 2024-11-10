import {Box, Typography} from "@mui/material";
import Slider from "@mui/material/Slider";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    resetFilters,
    selectedBrand,
    selectedCategory, selectedName,
    selectedPriceRange,
    selectedRatingRange, setSelectedBrand,
    setSelectedCategory, setSelectedName,
    setSelectedPriceRange,
    setSelectedRatingRange
} from "./filtersSlice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function valuetext(value) {
    return `$${value}`;
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const categoryOptions = [
    {name: 'Electronics', value: 'Electronics'},
    {name: 'Footwear', value: 'Footwear'},
    {name: 'Clothing', value: 'Clothing'}
];

const brandOptions = [
    {name: 'Brand A', value: 'Brand A'},
    {name: 'Brand B', value: 'Brand B'},
    {name: 'Brand C', value: 'Brand C'},
    {name: 'Brand D', value: 'Brand D'},
    {name: 'Brand E', value: 'Brand E'},
]

export const Filters = () => {
    const priceRange = useSelector(selectedPriceRange);
    const ratingRange = useSelector(selectedRatingRange);
    const category = useSelector(selectedCategory);
    const brand = useSelector(selectedBrand);
    const name = useSelector(selectedName);
    const dispatch = useDispatch();
    const [nameValue, setNameValue] = useState(name);
    const [priceValue, setPriceValue] = useState(priceRange);

    const debouncedName = useDebounce(nameValue, 500);
    const debouncedPrice = useDebounce(priceValue, 500)

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    }

    const handleCategoryChange = (event) => {
        dispatch(setSelectedCategory(event.target.value));
    }

    const handlePriceChange = (event, newValue) => {
        setPriceValue(newValue);
    }

    const handleRatingChange = (event, newValue) => {
        dispatch(setSelectedRatingRange(newValue));
    }

    const handleBrandChange = (event) => {
        dispatch(setSelectedBrand(event.target.value));
    }

    const resetAllFilters = () => {
        dispatch(resetFilters());
        setNameValue('');
        setPriceValue([1, 1000]);
    }


    useEffect(() => {
        dispatch(setSelectedName(debouncedName));
    }, [debouncedName]);

    useEffect(() => {
        dispatch(setSelectedPriceRange(debouncedPrice));
    }, [debouncedPrice]);

    return (
        <Box sx={{padding: '15px'}}>
            <Typography variant="h5" sx={{color: '#1976d2'}}>
                Filters
            </Typography>
            <hr/>
            <Box sx={{width: 200, marginBottom: '15px'}}>
                <Typography id="price-slider" gutterBottom>
                    Name
                </Typography>
                <TextField variant="outlined" value={nameValue} onChange={handleNameChange}/>
            </Box>
            <Box sx={{width: 200, marginBottom: '15px'}}>
                <Typography gutterBottom>
                    Category
                </Typography>
                <Select
                    inputProps={{"data-testid": "category"}}
                    sx={{minWidth: "200px"}}
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categoryOptions.map(option => {
                        return <MenuItem value={option.value}>{option.name}</MenuItem>
                    })}
                </Select>
            </Box>
            <Box sx={{width: 200, marginBottom: '15px'}}>
                <Typography gutterBottom>
                    Brand
                </Typography>
                <Select
                    inputProps={{"data-testid": "brand"}}
                    sx={{minWidth: "200px"}}
                    value={brand}
                    onChange={handleBrandChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {brandOptions.map(option => {
                        return <MenuItem value={option.value}>{option.name}</MenuItem>
                    })}
                </Select>
            </Box>
            <Box sx={{width: 200, marginBottom: '15px'}}>
                <Typography id="price-slider" gutterBottom>
                    Price
                </Typography>
                <Slider
                    inputProps={{"data-testid": "price"}}
                    min={1}
                    max={1000}
                    getAriaLabel={() => 'Price range'}
                    value={priceValue}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    aria-labelledby="price-slider"
                />
            </Box>
            <Box sx={{width: 200, marginBottom: '15px'}}>
                <Typography id="rating-slider" gutterBottom>
                    Rating
                </Typography>
                <Slider
                    min={1}
                    max={5}
                    getAriaLabel={() => 'Rating range'}
                    value={ratingRange}
                    onChange={handleRatingChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    aria-labelledby="rating-slider"
                />
            </Box>
            <Box sx={{width: 200}}>
                <Button variant="contained" onClick={resetAllFilters}>Reset All Filters</Button>
            </Box>
        </Box>
    )
}