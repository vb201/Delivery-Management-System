import { issues, vehicles, components, transactions } from '../data.js';

const registerIssue = (req, res) => {
  const { vehicleId, description, comp, totalAmount } = req.body;

  const vehicle = vehicles.find((v) => v.id === vehicleId);
  if (!vehicle) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  let calculatedTotalAmount = 0;
  for (const component of comp) {
    const validComponent = components.find(
      (c) => c.id === component.componentId
    );
    if (!validComponent) {
      return res.status(400).json({
        error: `Component with ID ${component.componentId} not found`,
      });
    }
    calculatedTotalAmount += parseFloat(component.amount);
  }

  if (calculatedTotalAmount !== totalAmount) {
    return res.status(400).json({
      error: 'Total amount does not match the sum of component amounts',
    });
  }

  const issue = {
    id: issues.length + 1,
    vehicleId,
    description,
    isRepaired: false,
    components: comp,
    totalAmount,
  };
  issues.push(issue);

  // Also marking transaction as paid in the data file
  transactions.push({
    id: transactions.length + 1,
    vehicleId,
    amountPaid: totalAmount,
    transactionDate: new Date(),
  });

  res.status(201).json({ issueId: issue.id });
};

const getOne = (req, res) => {
  const { id } = req.params;
  const issue = issues.find((issue) => issue.id === parseInt(id, 10));
  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  res.status(200).json(issue);
};

const getAll = (req, res) => {
  res.status(200).json(issues);
};

export { registerIssue, getOne, getAll };
