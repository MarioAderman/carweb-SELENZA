import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import vehiclesRoutes from './routes/vehicles.routes';
import imagesRoutes from './routes/images.routes';
import surveyRoutes from './routes/survey.routes';
import analyticsRoutes from './routes/analytics.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/analytics', analyticsRoutes);

// Ruta raíz
app.get('/', (_req, res) => {
  res.send('🚗 API del concesionario funcionando correctamente');
});

export default app;
