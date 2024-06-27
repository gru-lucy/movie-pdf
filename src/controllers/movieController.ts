import { Request, Response } from 'express';
import { getPopularMovies, getMovieDetails } from '../services/movieService';
import { generateMovieListPDF, generateMovieDetailsPDF } from '../utils/pdfGenerator';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getPopularMovies();
    const pdfBuffer = await generateMovieListPDF(movies);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate movie list PDF' });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieDetails(movieId);
    const pdfBuffer = await generateMovieDetailsPDF(movie);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate movie details PDF' });
  }
};
