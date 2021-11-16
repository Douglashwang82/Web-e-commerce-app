import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';

import useStyles from './styles';
import CartItem from './cartItem/CartItem';

import { Link } from 'react-router-dom';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart}) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant = "subtitle1"> You have no items in your cart.
        <Link className ={classes.link} to='/'>start adding some</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
      <Grid container spacing={3}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} onRemoveFromCart = {onRemoveFromCart} onUpdateCartQty={onUpdateCartQty}/>
          </Grid>
        ))}
      </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal:{cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick = {onEmptyCart}>Empty Cart</Button>
                    <Button component = {Link} to='/checkout' className={classes.emptyButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );
    if (!cart.line_items) return 'Loading'; // Prevent networking delay.

    return (
        <Container>
            <div className={classes.toolbar} />
            {/* this is for push down the main page */}

            <Typography className={classes.title} variant='h3' gutterBottom> Your Shooping Cart</Typography>
            {!cart.line_items ? <EmptyCart/> : <FilledCart />}
        </Container>
    )
}

export default Cart
