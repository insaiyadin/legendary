import { useFormik } from "formik";
import { CreateMovieDto } from "../../models/create-movie";
import { useMutation } from "@tanstack/react-query";
import { createMovie } from "../../api/movies";

function CreateMovie() {
  const { mutate } = useMutation({
    mutationFn: createMovie,
  });

  const formik = useFormik<CreateMovieDto>({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div>
      <h1>Create Movie</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateMovie;
