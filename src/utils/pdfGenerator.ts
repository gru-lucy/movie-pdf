import PDFDocument from 'pdfkit';
import { Movie, MovieDetails } from '../types';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const fetchImageBuffer = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
};

export const generateMovieListPDF = (movies: Movie[]): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text('Popular Movies', { align: 'center', underline: true });
    doc.moveDown(2);

    doc.fontSize(14)
      .text('Title ===> Release Date', { continued: true })
      .text('Vote Average', { align: 'right' });
    doc.moveDown(0.5);
    doc.moveTo(72, doc.y).lineTo(540, doc.y).stroke();
    doc.moveDown(0.5);

    movies.forEach(movie => {
      doc.fontSize(11)
        .text(movie.title, { link: `http://localhost:${process.env.PORT}/movies/${movie.id}`, continued: true, underline: true })
        .text(' is released at ', { continued: true, underline: false })
        .text(movie.release_date, { continued: true })
        .text(movie.vote_average.toString(), { align: 'right' })
        .moveDown(0.5);
    });

    doc.end();
  });
};

export const generateMovieDetailsPDF = async (movie: MovieDetails): Promise<Buffer> => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text(movie.title, { align: 'center', underline: true });
    doc.moveDown(2);

    doc.fontSize(13).text('Title:', { continued: true }).text(movie.title);
    doc.moveDown(0.5);
    doc.text('Release Date:', { continued: true }).text(movie.release_date);
    doc.moveDown(0.5);
    doc.text('Vote Average:', { continued: true }).text(movie.vote_average.toString());
    doc.moveDown(0.5);

    if (movie.poster_path) {
      const imageUrl = `${process.env.TMDB_BASE_IMAGE_URL}${movie.poster_path}`;
      const imageBuffer = await fetchImageBuffer(imageUrl);

      const imageWidth = 300;
      const imageHeight = 480;
      const pageWidth = doc.page.width;
      const imageX = (pageWidth - imageWidth) / 2;

      doc.image(imageBuffer, imageX, doc.y, { width: imageWidth, height: imageHeight });
    }

    doc.end();
  });
};
