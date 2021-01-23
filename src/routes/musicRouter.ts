import express, { Router } from "express";
import MusicController from "../controller/MusicController";

export const musicRouter: Router = express.Router();

musicRouter.post("/", MusicController.createMusic);
musicRouter.get("/genres", MusicController.getGenreNames);
musicRouter.get("/albums", MusicController.getAlbums);
musicRouter.get("/artists", MusicController.getArtistNames);
musicRouter.get("/:id?", MusicController.getMusic);