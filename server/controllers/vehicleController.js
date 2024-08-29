import { vehicles } from '../data.js';

const registerVehicle = (req, res) => {
  const { make, model, year } = req.body;
  const vehicle = { id: vehicles.length + 1, make, model, year };
  vehicles.push(vehicle);
  res.status(201).json({ vehicleId: vehicle.id });
};

const getOneVehicle = (req, res) => {
  const { id } = req.params;
  const vehicle = vehicles.find((v) => v.id === parseInt(id));
  if (vehicle) {
    res.status(200).json(vehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

const getAllVehicles = (req, res) => {
  res.status(200).json(vehicles);
};

export { registerVehicle, getOneVehicle, getAllVehicles };
