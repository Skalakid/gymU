import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import workoutRoutes from './routes/workout.routes';
import exerciseRoutes from './routes/exercise.routes';
import measurementRoutes from './routes/measurement.routes';
import calendarRoutes from './routes/calendar.routes';
import ratiosRoutes from './routes/ratios.routes';
import errorHandler from './middlewares/error.middleware';
import initSwagger from './config/swagger';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Basic Node server with TypeScript');
});

app.use(authRoutes);
app.use('/user', userRoutes);
app.use('/workout', workoutRoutes);
app.use('/exercise', exerciseRoutes);
app.use('/measurement', measurementRoutes);
app.use('/calendar', calendarRoutes);
app.use('/ratios', ratiosRoutes);
app.use(errorHandler);
initSwagger(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
