import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.TMDB_API_KEY;
const baseUrl = process.env.TMDB_BASE_URL;

export const getPopularMovies = async () => {
  const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
  return response.data.results;
};

export const getMovieDetails = async (movieId: string) => {
  const response = await axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
  return response.data;
};
