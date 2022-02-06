import React, { useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import {getCurrencyExchangeRate} from "../store/action/prdouct"

const Product = () => {
    const productsList = [
        {
            img: './images/school_bag.jpg',
            title: 'School Bag',
            price: 1000,
            currency: 'Rs'
        },
        {
            img: './images/shoes.jpg',
            title: 'Shoes',
            price: 1200,
            currency: 'Rs'
        },
        {
            img: './images/watch.jpeg',
            title: 'Watch',
            price: 3000,
            currency: 'Rs'
        }
    ];

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const dispatch = useDispatch();
    const [currency, setCurrency] = React.useState('INR');
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = React.useState(productsList);
    const conversionRateUSD = useSelector(state => {
        if (state && state.fetchExchangeRateResponse && state.fetchExchangeRateResponse.USD) {
            return state.fetchExchangeRateResponse.USD;
        }
    });

    const handleChange = (event) => {
        setCurrency(event.target.value);
        if (!conversionRateUSD){
            dispatch(getCurrencyExchangeRate());
        }
        else {
            showRateAsPerCurrency(event.target.value);
        }
    };

    const showRateAsPerCurrency = useCallback((currency) => {
        switch(currency) {
            case 'INR':
                    setProducts(productsList);
                break;
            case 'USD':
                    if (conversionRateUSD) {
                        setProducts(productsList.map(product => {
                            product.currency ='$';
                            product.price = product.price * conversionRateUSD;
                            return product;
                        }))
                    }
                break;
            default:
        }
    }, [conversionRateUSD, productsList]);

    useEffect(()=> {
        showRateAsPerCurrency(currency);
    }, [conversionRateUSD, currency, showRateAsPerCurrency])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <div style={{margin:20, textAlign:'right'}}>
                <FormControl sx={{ m: 1, width: 120 }}>
                    <InputLabel id="demo-multiple-name-label">Currency</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={currency}
                        label="Currency"
                        onChange={handleChange}
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                    >
                        <MenuItem value={'INR'}>INR</MenuItem>
                        <MenuItem value={'USD'}>USD</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Grid container spacing={2} columns={12}>
                <Item item xs={4} spacing={2}>
                    {products.map((item) => (
                        <ImageListItem key={item.img} sx={{ m: 2 }}>
                            <img
                                src={require(`${item.img}`)}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>{item.currency} {item.price}</span>}
                                position="below"
                            />
                        </ImageListItem>
                    ))}
                </Item>
            </Grid>
        </div>
    )
}

export default Product;