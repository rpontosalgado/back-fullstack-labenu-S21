import express, { Router } from "express";
import PlaylistController from "../controller/PlaylistController";

export const playlistRouter: Router = express.Router();

playlistRouter.put("/", PlaylistController.createPlaylist);
playlistRouter.put("/music", PlaylistController.addMusicToPlaylist);
playlistRouter.get("/:id", PlaylistController.getPlaylist);