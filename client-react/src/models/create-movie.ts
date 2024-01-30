import { Movie } from "./movie";

export type CreateMovieDto = Omit<Movie, "id">;
