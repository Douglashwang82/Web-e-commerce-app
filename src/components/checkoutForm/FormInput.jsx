import React from 'react'
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller, useForm } from 'react-hook-form';

const FormInput = ({name, label, required}) => {
    const { control } = useFormContext(); //useFormContext  use when nested component. if not nested, useForm().
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name = {name}
                control={ control }
                fullWidth
                defaultValue =""
            //     render = { ( {field}) => 
            // (
            //     <TextField/>
            // )}
            render={({field}) => 
                <TextField
                //   label = {label}
                //   required = {required}
                //   name = {name}
                //   control = {control}
                label = {label}
                {...field}          //necessary for form data spreading
                />
              }
            ></Controller>
        </Grid>
    )
}

export default FormInput
