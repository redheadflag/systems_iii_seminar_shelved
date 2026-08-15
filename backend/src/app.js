import express from 'express';
import userRoutes from './routes/userRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';

const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/collections', collectionRoutes)

export default app;
