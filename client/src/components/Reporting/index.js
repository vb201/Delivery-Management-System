import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Reporting = () => {
  const [reportingData, setReportingData] = useState([]);
  const [reportingType, setReportingType] = useState('daily');
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3010/analytics?type=${reportingType}`)
      .then((response) => {
        setReportingData(response.data);
      });
  }, [reportingType]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Reporting</h1>
      <LineChart
        width={700}
        height={500}
        data={reportingData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>

      <div
        style={{
          display: 'flex',
          gap: '10px',

          marginTop: '20px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReportingType('daily')}
        >
          Daily
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReportingType('monthly')}
        >
          Monthly
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReportingType('yearly')}
        >
          Yearly
        </Button>
      </div>
    </div>
  );
};

export default Reporting;
