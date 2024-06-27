# Movie PDF Generator

This project is a Node.js application built with Express and TypeScript that integrates with The Movie Database (TMDB) API. It generates PDF documents containing movie data, such as movie lists and detailed information about each movie.

## Features

- Fetch popular movies and generate a PDF document listing them with links to detailed views.
- Generate a detailed PDF document for a specific movie using its ID.

## Technologies Used

- Node.js (v20)
- Express.js
- TypeScript
- PDFKit for generating PDF documents
- Axios for making HTTP requests

## Prerequisites

Before you begin, ensure you have Node.js installed (preferably version 20.x). You will also need an API key from TMDB to fetch movie data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gru-lucy/movie-pdf
   cd movie-pdf
   ```

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a .env file in the root directory and add the following:

   ```bash
   TMDB_API_KEY=your_tmdb_api_key_here
   TMDB_BASE_URL=https://api.themoviedb.org/3
   TMDB_BASE_IMAGE_URL=https://image.tmdb.org/t/p/w500
   PORT=3000
   ```

## Available Scripts

In the project directory, you can run:

### npm run start

Runs the app in the development mode using `ts-node`.

Open http://localhost:3000/movies to view it in the browser.


### npm run dev

uns the app in development mode with `nodemon`, watching for changes.

### npm run build

Compiles TypeScript files to JavaScript in the `dist` directory.

### npm run serve

Runs the compiled app from the `dist` directory.


## API Endpoints

- `GET /movies`

  Returns a PDF document containing a list of popular movies.

- `GET /movies/:id`

  Returns a PDF document with detailed information about a specific movie.

## Author

 - gru-lucy