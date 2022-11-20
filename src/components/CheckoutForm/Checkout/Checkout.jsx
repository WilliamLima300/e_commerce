import React, { useState, useEffect } from 'react';
import { Paper ,Stepper ,Step , StepLabel , Typography, CircularProgress, Divider,Button} from '@material-ui/core'; //importar do materialUi os componentes necessarios
import useStyles from './styles'; //importar Estilo da pagina
import AddressForm from '../AddressForm'; // importar formulario de endereços
import PaymentForm from '../PaymentForm'; // importar formulario de pagamentos
import { commerce } from '../../../lib/commerce';
const steps =['Endereço de entrega','Detalhes do pagamento'];

const Checkout = ({cart}) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const [checkoutToken, setCheckoutToken] = useState(null);

  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep) + 1;
  
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep) - 1;
  
  useEffect(() => {
    const generateToken = async () => {
      try{

        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'})
        
       
        setCheckoutToken(token);

      } catch(error){

      }
    }

    generateToken();
  },[cart]);

    
  const test = (data) =>{
    setShippingData(data);
    nextStep();
  }

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  );

  const Form = () => activeStep === 0 
  ? <AddressForm checkoutToken={checkoutToken} test={test} nextStep={nextStep} setShippingData={setShippingData}/> 
  : <PaymentForm nextStep={nextStep} backStep={backStep} checkoutToken={checkoutToken} shippingData={shippingData}/>
  
  
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Finalizar pedido</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
