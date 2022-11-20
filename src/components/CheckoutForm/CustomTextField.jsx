import React from 'react';
import { TextField, Grid } from '@material-ui/core';//importar componentes do material ui
import { useFormContext, Controller } from 'react-hook-form';//importar componentes do hook form


const FormInput = ({ name, label}) => {
  const { control } = useFormContext();  

  return (
    <Grid item xs={12} sm={6}>

    <Controller
        defaultValue=""
        control={control}
        name={name}
        render = {({ field})=> (
            <TextField
                
                fullWidth
                label={label}
                required
            />
        )}
    />

      
    </Grid>
  )
}

export default FormInput
