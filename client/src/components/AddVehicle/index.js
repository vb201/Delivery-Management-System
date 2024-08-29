import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from '../../context/SnackbarContext';

const AddVehicle = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { openSnackbar } = useSnackbar();

  const onSubmit = (data) => {
    axios.post('http://127.0.0.1:3010/vehicles/', data).then(() => {
      openSnackbar('Vehicle added successfully');
    });
  };

  return (
    <div>
      <h1>Register a new Vehicle</h1>
      <p>Fill in the form below to register a new vehicle.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="make"
          control={control}
          defaultValue=""
          rules={{ required: 'Vehicle make is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Vehicle Make"
              fullWidth
              margin="normal"
              error={!!errors.make}
              helperText={errors.make ? errors.make.message : ''}
            />
          )}
        />
        <Controller
          name="model"
          control={control}
          defaultValue=""
          rules={{ required: 'Vehicle model is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Vehicle Model"
              fullWidth
              margin="normal"
              error={!!errors.model}
              helperText={errors.model ? errors.model.message : ''}
            />
          )}
        />
        <Controller
          name="year"
          control={control}
          defaultValue=""
          rules={{ required: 'Vehicle year is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Vehicle Year"
              type="number"
              fullWidth
              margin="normal"
              error={!!errors.year}
              helperText={errors.year ? errors.year.message : ''}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Register Vehicle
        </Button>
      </form>
    </div>
  );
};

export default AddVehicle;
