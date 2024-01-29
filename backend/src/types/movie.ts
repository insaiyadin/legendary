export type Movie = {
  id: number;
  title: string;
};

export type CreateMovieDto = Omit<Movie, "id">;
