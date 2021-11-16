import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import {commerce } from '../../../lib/commerce';
import { CodeOutlined } from '@material-ui/icons';

import { Link, useNavigate } from 'react-router-dom';



const Checkout = ( { cart , order, onCaptureCheckout, error, cleanError}) => {
    const navigate = useNavigate();
    const steps = ['Shipping address', 'Payment detail'];
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const [checkoutToken, setcheckoutToken] = useState(null); // default value null
    const [shippingData, setShippingData] = useState({});
    useEffect(() => {   // async can not use in here so we need to define that in the function
        const generateToken = async () => {
            try {
              const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
              console.log("tt",token);
              setcheckoutToken(token);
            } catch {
              //navigate('/');
            }
          };
          generateToken();
        }, [cart]);

    
    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1);
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1);
    const emptyShippingData = () => setShippingData({});
    const next = (data) => {
      setShippingData(data);
      console.log("shippingData:",data);
      nextStep();
    }

    let Confirmation = () => (order.customer ? (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    ));
  
    if (error) {

      Confirmation = () => (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <Typography variant="h6"></Typography>
          {console.log(shippingData)}
          {console.log(checkoutToken)}
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      )
    ;
    emptyShippingData();
    cleanError();
    }
    const Form = () => activeStep === 0 
        ?<AddressForm checkoutToken = {checkoutToken} next = {next}/>
        :<PaymentForm shippingData ={shippingData} checkoutToken = {checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>
    
    return (
        <>
        <CssBaseline />
        <div className={classes.toolbar} />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />} 
            {/* val && <Componenet> for wait for val to generate */}
          </Paper>
        </main>
      </>
    )
}

export default Checkout
