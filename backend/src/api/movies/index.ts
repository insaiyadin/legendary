import { Router } from "express";
import { create, findMany, findOne, remove } from "../../services/movies";

const router = Router();

router.get("/", (req, res) => {
  const movies = findMany();
  res.send(movies);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  const movie = findOne(Number(id));

  if (!movie) {
    throw new Error("Movie not found");
  }

  res.send(movie);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  remove(Number(id));

  res.status(204).send();
});

router.post("/", (req, res) => {
  const title = req.body.title || "";

  const movie = create({ title });

  res.status(201).send(movie);
});

export default router;
