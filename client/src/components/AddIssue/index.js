import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar } from '../../context/SnackbarContext';

const AddIssue = () => {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      comp: [{ componentId: '', componentName: '', condition: '', amount: '' }],
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'comp',
  });

  const { openSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:3010/vehicles')
      .then((response) => {
        setVehicles(response.data);
      })
      .catch(() => {
        openSnackbar('Error: Unable to fetch vehicles');
      });

    axios
      .get('http://127.0.0.1:3010/components')
      .then((response) => {
        setComponents(response.data);
      })
      .catch(() => {
        openSnackbar('Error: Unable to fetch components');
      });
  }, []);

  const onSubmit = (data) => {
    data.comp = data.comp.map((component) => ({
      ...component,
      componentId: Number(component.componentId),
      id: Number(component.componentId),
    }));
    const payload = {
      ...data,
      vehicleId: selectedVehicle,
      totalAmount: fields.reduce((acc, curr) => acc + Number(curr.amount), 0),
    };
    axios.post('http://127.0.0.1:3010/issues/', payload).then(() => {
      openSnackbar('Issue added successfully');
      reset();
      setSelectedVehicle('');
    });
  };

  const handleComponentChange = (index, event) => {
    const selectedComponent = components.find(
      (component) => component.name === event.target.value
    );
    update(index, {
      ...fields[index],
      componentName: event.target.value,
      componentId: selectedComponent.id,
    });
  };

  const handleConditionChange = (index, event) => {
    const selectedComponent = components.find(
      (component) => component.id === fields[index].componentId
    );
    const amount =
      event.target.value === 'new'
        ? selectedComponent.price
        : selectedComponent.repairPrice;
    update(index, {
      ...fields[index],
      condition: event.target.value,
      amount,
    });
  };

  return (
    <div>
      <h1>Add a new issue</h1>
      <p>Fill in the form below to add a new issue.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel id="vehicle-select-label">Select Vehicle</InputLabel>
          <Select
            labelId="vehicle-select-label"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            {vehicles.map((vehicle) => (
              <MenuItem
                key={vehicle.id}
                value={vehicle.id}
              >
                {vehicle.make} : {vehicle.model} : {vehicle.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedVehicle && (
          <>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  margin="normal"
                />
              )}
            />
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Controller
                  name={`comp[${index}].componentId`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Component ID"
                      InputProps={{
                        readOnly: true,
                      }}
                      disabled
                      style={{ marginRight: '10px' }}
                    />
                  )}
                />
                <Controller
                  name={`comp[${index}].componentName`}
                  control={control}
                  render={({ field }) => (
                    <FormControl style={{ marginRight: '10px' }}>
                      <InputLabel>Component Name</InputLabel>
                      <Select
                        {...field}
                        onChange={(event) => {
                          field.onChange(event);
                          handleComponentChange(index, event);
                        }}
                        sx={{ width: '200px' }}
                      >
                        {components.map((component) => (
                          <MenuItem
                            key={component.id}
                            value={component.name}
                          >
                            {component.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name={`comp[${index}].condition`}
                  control={control}
                  render={({ field }) => (
                    <FormControl style={{ marginRight: '10px' }}>
                      <InputLabel>Condition</InputLabel>
                      <Select
                        {...field}
                        sx={{ width: '200px' }}
                        onChange={(event) => {
                          field.onChange(event);
                          handleConditionChange(index, event);
                        }}
                      >
                        <MenuItem value="new">New</MenuItem>
                        <MenuItem value="repaired">Repaired</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
                <Controller
                  name={`comp[${index}].amount`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Amount"
                      disabled
                      style={{ marginRight: '10px' }}
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    append({
                      componentId: '',
                      componentName: '',
                      condition: '',
                      amount: '',
                    })
                  }
                >
                  Add
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          Total Amount:{' '}
          {fields.reduce((acc, curr) => acc + Number(curr.amount), 0)}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              maxWidth: '200px',
            }}
          >
            Add issue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddIssue;
