import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "react-bootstrap";
import { deleteMovie } from "../../api/movies";
import { Movie } from "../../models/movie";

type DeleteMovieButtonProps = {
  id: number;
};

function DeleteMovieButton({ id }: DeleteMovieButtonProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteMovie,
    onSuccess() {
      queryClient.setQueryData<Movie[]>(["movies"], (old) => {
        if (old) {
          return old.filter((movie) => movie.id !== id);
        }
        return [];
      });
    },
  });

  return (
    <Button variant="danger" size="sm" onClick={() => mutate(id)}>
      Delete
    </Button>
  );
}

export default DeleteMovieButton;
