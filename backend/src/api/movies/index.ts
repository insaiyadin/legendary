import { Router } from "express";
import { create, findMany, findOne, remove } from "../../services/movies";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await findMany();
    res.send(movies);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const movie = await findOne(Number(id));

    if (!movie) {
      const error = new Error("Movie not found");
      return next(error);
    }

    res.send(movie);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    await remove(Number(id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const title = req.body.title || "";

  try {
    const movie = await create({ title });

    res.status(201).send(movie);
  } catch (error) {
    next(error);
  }
});

export default router;
