import { Request, Router } from "express";
import { create, findMany, findOne, remove } from "../../services/movies";
import { NotFoundError } from "../../errors/not-found";
import { ConflictError } from "../../errors/conflict";
import { body, param } from "express-validator";
import validationMiddleware from "../../middlewares/validation";

const paramValidationChain = param("id")
  .isNumeric()
  .withMessage("Id must be a number");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await findMany();
    res.send(movies);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  paramValidationChain,
  validationMiddleware,
  async (req, res, next) => {
    const id = req.params.id;

    try {
      const movie = await findOne(Number(id));

      if (!movie) {
        const error = new NotFoundError("Movie not found");
        return next(error);
      }

      res.send(movie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  paramValidationChain,
  validationMiddleware,
  async (req: Request<{ id: string }>, res, next) => {
    const id = req.params.id;

    try {
      await remove(Number(id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be minimum 3 characters"),
  validationMiddleware,
  async (req, res, next) => {
    const title = req.body.title || "";

    try {
      const movie = await create({ title });

      res.status(201).send(movie);
    } catch (error) {
      if ((error as any)?.code === "23505") {
        const conflictError = new ConflictError("Movie already exists");
        return next(conflictError);
      }
      next(error);
    }
  }
);

export default router;
