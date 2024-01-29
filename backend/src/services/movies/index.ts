import { CreateMovieDto, Movie } from "../../types/movie";

const movies: Movie[] = [];

const generateMovieId = (): number => {
  return movies.length + 1;
};

export const findMany = (): Movie[] => {
  return movies;
};

export const findOne = (id: number): Movie | undefined => {
  return movies.find((movie) => movie.id === id);
};

export const create = (createMovieDto: CreateMovieDto): Movie => {
  const movieId = generateMovieId();
  const movie = {
    id: movieId,
    ...createMovieDto,
  };

  movies.push(movie);

  return movie;
};

export const remove = (id: number): void => {
  const index = movies.findIndex((movie) => movie.id === id);
  movies.splice(index, 1);
};
