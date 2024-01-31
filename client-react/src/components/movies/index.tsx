import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/movies";
import { Button, ListGroup, Spinner } from "react-bootstrap";
import DeleteMovieButton from "../delete-movie-button";

function Movies() {
  const { isLoading, data, isError, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const refetchButton = (
    <Button size="sm" onClick={() => refetch()}>
      Refresh
    </Button>
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <>
        <p>Something went wrong</p>
        {refetchButton}
      </>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Movies</h2>
        {refetchButton}
      </div>

      {data?.length === 0 && <p>Your movies library is empty</p>}

      <ListGroup>
        {data?.map((movie) => (
          <ListGroup.Item
            key={movie.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {movie.title}
            <DeleteMovieButton id={movie.id} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Movies;
