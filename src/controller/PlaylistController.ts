import { Request, Response } from "express";
import PlaylistBusiness from "../business/PlaylistBusiness";
import { PlaylistInputDTO } from "../model/Playlist";

export class PlaylistController {
  async createPlaylist(req: Request, res: Response):Promise<void> {
    try {
      const input: PlaylistInputDTO = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        image: req.body.image
      };

      await PlaylistBusiness.createPlaylist(
        input,
        req.headers.authorization as string
      );

      res.status(201).end();
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
  }
}

export default new PlaylistController();