import express from 'express';
import checklistRouter from './routes/checklistRoutes.ts';

const app = express();

// Middleware
app.use(express.json());

// Handle any requests to /v1/checklist using checklistRouter
app.use('/v1/checklist', checklistRouter);

export default app;