import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use('/movies', movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
