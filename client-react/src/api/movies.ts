import { CreateMovieDto } from "../models/create-movie";
import { Movie } from "../models/movie";
import { api } from "./axios";

export const fetchMovies = async () => {
  const response = await api.get<Movie[]>("/api/movies");
  return response.data;
};

export const createMovie = async (movieData: CreateMovieDto) => {
  const response = await api.post<Movie>("/api/movies", movieData);
  return response.data;
};
