import {useEffect, useState, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, isFetching, products} from "./productsSlice";
import ClipLoader from "react-spinners/ClipLoader";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import {
    selectedBrand,
    selectedCategory,
    selectedName,
    selectedPriceRange,
    selectedRatingRange
} from "../filters/filtersSlice";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
    {
        id: 'image',
        numeric: false,
        disablePadding: false,
        label: 'Image',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'brand',
        numeric: false,
        disablePadding: false,
        label: 'Brand',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: false,
        label: 'Rating',
    },
];

function ProductsTableHead({order, orderBy, onRequestSort}) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{fontWeight: 'bold'}}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            data-testid={'sort-by-' + headCell.id}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export function ProductsTable({allProducts}) {
    const priceRange = useSelector(selectedPriceRange);
    const ratingRange = useSelector(selectedRatingRange);
    const category = useSelector(selectedCategory);
    const brand = useSelector(selectedBrand);
    const name = useSelector(selectedName);
    const [filteredProducts, setFilteredProducts] = useState(allProducts)
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const filterProducts = () => {
        return allProducts.filter((product) => {
            const matchesName = name ? product.name.toLowerCase().startsWith(name.toLowerCase()) : true;
            const matchesCategory = category ? product.category === category : true;
            const matchesPrice = priceRange.length ?
                product.price >= priceRange[0] && product.price <= priceRange[1] : true;
            const matchesBrand = brand ? product.brand === brand : true;
            const matchesRating = ratingRange ? product.rating >= ratingRange[0] && product.rating <= ratingRange[1] : true;

            return matchesName && matchesCategory && matchesPrice && matchesBrand && matchesRating;
        });
    };

    useEffect(() => {
        setFilteredProducts(filterProducts());
    }, [category, priceRange, name, ratingRange, brand, allProducts]);

    useEffect(() => {
        if (allProducts.length > 0) {
            setFilteredProducts(allProducts);
        }
    }, [allProducts])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <ProductsTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredProducts.length ? [...filteredProducts]
                                .sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <TableCell><img style={{height: '50px'}} src={row.imageUrl}/></TableCell>
                                            <TableCell data-testid="product-name">{row.name}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.brand}</TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.rating}</TableCell>
                                        </TableRow>
                                    );
                                }) : <Box component="span" sx={{padding: '15px'}}>No products found</Box>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export const Products = () => {
    const dispatch = useDispatch();
    const loading = useSelector(isFetching);
    const allProducts = useSelector(products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    if (loading) {
        return (
            <Box sx={{textAlign: 'center'}}>
                <ClipLoader
                    color="#1976d2"
                    loading={loading}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Box>
        )
    }

    return <ProductsTable allProducts={allProducts}/>
}
