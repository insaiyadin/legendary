import { Movie } from "../models/movie";
import { api } from "./axios";

export const fetchMovies = async () => {
  const response = await api.get<Movie[]>("/api/movies");
  return response.data;
};
