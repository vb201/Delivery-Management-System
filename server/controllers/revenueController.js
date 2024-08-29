import { transactions } from '../data.js';
import {
  startOfDay,
  startOfMonth,
  startOfYear,
  format,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

export const getRevenue = (req, res) => {
  const today = new Date();
  const { type } = req.query;

  let filteredTransactions = [];
  let name = '';

  switch (type) {
    case 'daily':
      const weekAgo = subDays(today, 7);
      filteredTransactions = transactions.filter(
        (t) => t.transactionDate >= startOfDay(weekAgo)
      );
      name = format(today, 'yyyy-MM-dd');
      break;
    case 'monthly':
      const yearAgo = subMonths(today, 12);
      filteredTransactions = transactions.filter(
        (t) => t.transactionDate >= startOfMonth(yearAgo)
      );
      name = format(today, 'MMMM');
      break;
    case 'yearly':
      const tenYearsAgo = subYears(today, 10);
      filteredTransactions = transactions.filter(
        (t) => t.transactionDate >= startOfYear(tenYearsAgo)
      );
      name = format(today, 'yyyy');
      break;
    default:
      return res.status(400).json({ error: 'Invalid type parameter' });
  }

  const getNameBasedOnType = (type, date) => {
    switch (type) {
      case 'daily':
        return format(date, 'yyyy-MM-dd');
      case 'monthly':
        return format(date, 'MMMM');
      case 'yearly':
        return format(date, 'yyyy');
      default:
        return '';
    }
  };
  const dataMap = new Map();

  filteredTransactions.forEach((t) => {
    const name = getNameBasedOnType(type, t.transactionDate);
    if (dataMap.has(name)) {
      dataMap.set(name, dataMap.get(name) + t.amountPaid);
    } else {
      dataMap.set(name, t.amountPaid);
    }
  });

  const data = Array.from(dataMap, ([name, amount]) => ({
    name,
    revenue: amount,
  }));

  res.json(data);
};
