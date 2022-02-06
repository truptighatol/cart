import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import {getCurrencyExchangeRate} from "../store/action/prdouct"


const Product = () => {
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const dispatch = useDispatch();
    const [curreny, setCurrency] = React.useState('');
    const [open, setOpen] = React.useState(false);
    // const exchangeRateResponse = useSelector(state => state.productReducer.fetchExchangeRateResponse);
    // console.log(exchangeRateResponse);

    const handleChange = (event) => {
        debugger;
        if(event.target.value === 1){
            setCurrency(event.target.value);
        }else{
            dispatch(getCurrencyExchangeRate());
            setCurrency(event.target.value);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const itemData = [
        {
            img: './images/school_bag.jpeg',
            title: 'School Bag',
            price: '1000',
        },
        {
            img: './images/shoes.jpeg',
            title: 'Shoes',
            price: '1200',
        },
        {
            img: './images/watch.jpeg',
            title: 'Watch',
            price: '3000',
        }
    ];
    return (
        <div>
            <div style={{margin:20, textAlign:'right'}}>
                <FormControl sx={{ m: 1, width: 120 }}>
                    <InputLabel id="demo-multiple-name-label">Currency</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={curreny}
                        label="Currency"
                        onChange={handleChange}
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                    >
                        <MenuItem value={1}>INR</MenuItem>
                        <MenuItem value={2}>USD</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Grid container spacing={2} columns={12}>
                <Item item xs={4} spacing={2}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img} sx={{ m: 2 }}>
                            <img
                                src={require(`${item.img}`)}
                                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.title}
                                subtitle={<span>Rs: {item.price}</span>}
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