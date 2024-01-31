import { useFormik } from "formik";
import { CreateMovieDto } from "../../models/create-movie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovie } from "../../api/movies";
import { Button, Form } from "react-bootstrap";
import { Movie } from "../../models/movie";
import { isAxiosError } from "axios";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
});

function CreateMovie() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createMovie,
    onSuccess(data) {
      formik.resetForm({ values: { title: "" } });
      queryClient.setQueryData<Movie[]>(["movies"], (old) => {
        if (old) {
          return [...old, data];
        }
        return [data];
      });
    },
    onError(error) {
      if (isAxiosError(error)) {
        formik.setErrors({
          title: error.response?.data?.message,
        });
        return;
      }

      formik.setErrors({
        title: error.message,
      });
    },
  });

  const formik = useFormik<CreateMovieDto>({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
    validationSchema,
  });

  return (
    <Form
      noValidate
      validated={
        formik.touched.title &&
        formik.isValid &&
        formik.errors.title === undefined
      }
      onSubmit={(e) => {
        e.preventDefault();
        formik.submitForm();
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter title"
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={formik.touched.title && formik.errors.title !== undefined}
        />
        <Form.Text className="text-muted">
          {formik.touched.title && formik.errors.title && (
            <p
              style={{
                color: "tomato",
              }}
            >
              {formik.errors.title}
            </p>
          )}
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isPending}>
        Submit
      </Button>
    </Form>
  );
}

export default CreateMovie;
