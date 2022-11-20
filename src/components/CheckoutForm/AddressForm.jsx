import React, { useState, useEffect }from 'react';
import { InputLabel, Select , MenuItem, Button, Grid, Typography} from '@material-ui/core'; //importar componentes do material UI
import {useForm, FormProvider } from 'react-hook-form'; //importar gerador de formularios do react hook
import FormInput from './CustomTextField'; // importar layout dos forms
import { commerce } from '../../lib/commerce'; //importar captura dos dados da API commerce.js
import { Link } from 'react-router-dom';//importar react-router-dom

const AdressForm = ({ checkoutToken, test}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const countries = Object.entries(shippingCountries).map(([code,name]) => ({id:code, label:name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => ({id:code, label:name}));
  const options = shippingOptions.map((sO) => ({id:sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }));
  

  
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    
    setShippingCountries(countries); //Adicionar os paises ao select
    setShippingCountry(Object.keys(countries)[0]);//escolher o primeir pais para exibição no select

  };

  const fetchSubdivisions = async (contryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(contryCode);
    
    setShippingSubdivisions(subdivisions); //Adicionar os estados ao select
    setShippingSubdivision(Object.keys(subdivisions)[0]); //escolher o primeiro estado para exibição no select
  };

  const fetchShippingOptions = async(checkoutTokenId,country, region=null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId , { country, region }); 
    setShippingOptions(options); //adicionando as opções de frete
    setShippingOption(options[0].id); //escolher a primeira opção de frete para exibição no select
  };

  useEffect(() => {
    if(checkoutToken && checkoutToken.id){
        fetchShippingCountries(checkoutToken);
    }
  }, [checkoutToken])

  useEffect(() => {
    if (shippingCountry){
      fetchSubdivisions(shippingCountry)
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision){
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }
  }, [shippingSubdivision]);




  return (
    <>
      <Typography variant="h6" gutterBottom>Formulário de entrega</Typography>
      <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => test({ data, shippingCountry, shippingSubdivision, shippingOption }))}>
          <Grid container spacing={3}>
            <FormInput  name='firstName' label='Nome' />
            <FormInput  name='lastName' label='Sobrenome' />
            <FormInput  name='address1' label='Endereço' />
            <FormInput  name='email' label='E-mail' />
            <FormInput  name='city' label='Cidade' />
            <FormInput  name='zip' label='CEP' />
           
            <Grid item xs={12} sm={6}>
              <InputLabel>País</InputLabel>
              <Select defaultValue = "" value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                {country.label}
                </MenuItem> 
                ))}

              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>UF</InputLabel>
              <Select defaultValue = "" value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
                {subdivisions.map((subdivision) => (
                <MenuItem key={subdivision.id} value={subdivision.id}>
                {subdivision.label}
                </MenuItem> 
                ))}

              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputLabel>Frete</InputLabel>
              <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem> 
                ))}

              </Select>
            </Grid> 

          </Grid>
          <br />
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <Button component={Link} to="/cart"  variant="outlined" color="secondary">Voltar ao carrinho</Button>
            <Button type="submit" variant="contained" color="primary">Continuar</Button>
          </div>
        </form>

      </FormProvider>
    </>
  );
};

export default AdressForm;
