import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from '../../context/SnackbarContext';

const RegisterComponent = () => {
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm();

  const { openSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    axios.post('http://127.0.0.1:3010/components/', data).then(() => {
      openSnackbar('Component registered successfully');
    });
  };

  return (
    <div>
      <h1>Register a new Component</h1>
      <p>Fill in the form below to register a new component.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: 'Component Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Component Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue=""
          rules={{ required: 'Price is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ''}
            />
          )}
        />
        <Controller
          name="repairPrice"
          control={control}
          defaultValue=""
          rules={{ required: 'Repair Price is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Repair Price"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.repairPrice}
              helperText={errors.repairPrice ? errors.repairPrice.message : ''}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Register Component
        </Button>
      </form>
    </div>
  );
};

export default RegisterComponent;
