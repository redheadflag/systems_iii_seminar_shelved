import express from 'express';
import userRoutes from './routes/userRoutes.js';
import collectionRoutes from './routes/collectionRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';

const app = express();

app.use(express.json());
app.use('/user', userRoutes);
app.use('/collections', collectionRoutes)
app.use('/cards', cardRoutes)
app.use('/media', mediaRoutes)

export default app;
