import { Router } from 'express';
import { getMovies, getMovieById } from '../controllers/movieController';

const router = Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);

export default router;
