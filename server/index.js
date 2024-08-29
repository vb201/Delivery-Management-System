import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import componentRoutes from './routes/componentRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import revenueRoutes from './routes/revenueRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/components', componentRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/issues', issueRoutes);
app.use('/analytics', revenueRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
