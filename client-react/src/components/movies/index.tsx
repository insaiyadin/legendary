import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/movies";
import { Spinner } from "react-bootstrap";

function Movies() {
  const { isLoading, data } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h2>Movies</h2>
      <div>
        {data?.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Movies;
