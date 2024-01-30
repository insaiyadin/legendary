import { db } from "../../database";
import { CreateMovieDto, Movie } from "../../types/movie";

export const findMany = async (): Promise<Movie[]> => {
  const movies = await db.query<Movie[]>("SELECT * FROM movies");

  console.log(movies);

  return movies;
};

export const findOne = async (id: number): Promise<Movie | null> => {
  const movie = await db.oneOrNone<Movie>(
    "SELECT * FROM movies WHERE id = $1",
    [id]
  );

  console.log(movie);

  return movie;
};

export const create = async (
  createMovieDto: CreateMovieDto
): Promise<Movie> => {
  const movie = await db.one<Movie>(
    "INSERT INTO movies (title) VALUES ($1) RETURNING *",
    [createMovieDto.title]
  );

  console.log(movie);

  return movie;
};

export const remove = async (id: number): Promise<void> => {
  const result = await db.query("DELETE FROM movies WHERE id = $1", [id]);
  console.log(result);
};
