export const components = [
  {
    id: 1,
    name: 'Part 1',
    price: '1000',
    repairPrice: '100',
  },
  {
    id: 2,
    name: 'Part 2',
    price: '2000',
    repairPrice: '200',
  },
];

export const vehicles = [
  {
    id: 1,
    make: 'Make 1',
    model: '131',
    year: '124142',
  },
  {
    id: 2,
    make: 'Make 2',
    model: '131',
    year: '124142',
  },
];

export const issues = [
  {
    id: 1,
    vehicleId: 1,
    description: 'Descriptyion',
    isRepaired: false,
    components: [
      {
        componentId: 1,
        componentName: 'Part 1',
        condition: 'repaired',
        amount: '100',
        id: '1',
      },
      {
        componentId: 1,
        componentName: 'Part 1',
        condition: 'new',
        amount: '1000',
        id: '2',
      },
    ],
    totalAmount: 1100,
  },
];

export const transactions = [
  {
    id: 1,
    vehicleId: 1,
    amountPaid: 1100,
    transactionDate: new Date(new Date().setDate(new Date().getDate() - 6)),
  },
  {
    id: 2,
    vehicleId: 2,
    amountPaid: 1500,
    transactionDate: new Date(new Date().setDate(new Date().getDate() - 4)),
  },
  {
    id: 3,
    vehicleId: 3,
    amountPaid: 2000,
    transactionDate: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    id: 4,
    vehicleId: 4,
    amountPaid: 2500,
    transactionDate: new Date(),
  },
  {
    id: 5,
    vehicleId: 5,
    amountPaid: 3000,
    transactionDate: new Date('2023-09-25T16:00:00Z'),
  },
  {
    id: 6,
    vehicleId: 1,
    amountPaid: 1100,
    transactionDate: new Date('2023-09-25T16:00:00Z'),
  },
  {
    id: 7,
    vehicleId: 2,
    amountPaid: 1500,
    transactionDate: new Date('2023-09-25T16:00:00Z'),
  },
  {
    id: 8,
    vehicleId: 3,
    amountPaid: 2000,
    transactionDate: new Date('2023-09-25T16:00:00Z'),
  },
  {
    id: 9,
    vehicleId: 4,
    amountPaid: 2500,
    transactionDate: new Date('2023-09-25T16:00:00Z'),
  },
];
