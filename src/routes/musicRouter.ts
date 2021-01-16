import express, { Router } from "express";
import MusicController from "../controller/MusicController";

export const musicRouter: Router = express.Router();

musicRouter.post("/", MusicController.createMusic);
musicRouter.get("/:id", MusicController.getMusic);