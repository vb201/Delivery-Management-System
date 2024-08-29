import { components } from '../data.js';

const registerComponent = (req, res) => {
  const { name, price, repairPrice } = req.body;
  const component = { id: components.length + 1, name, price, repairPrice };
  components.push(component);
  res.status(201).json({ componentId: component.id });
};

const getOneComponent = (req, res) => {
  const { id } = req.params;
  const component = components.find((c) => c.id === parseInt(id));
  if (component) {
    res.status(200).json(component);
  } else {
    res.status(404).json({ message: 'Component not found' });
  }
};

const getAllComponents = (req, res) => {
  res.status(200).json(components);
};

export { registerComponent, getOneComponent, getAllComponents };
