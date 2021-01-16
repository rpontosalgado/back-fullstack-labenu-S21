import { Request, Response } from "express";
import MusicBusiness from "../business/MusicBusiness";
import { Music, MusicFilterDTO, MusicInputDTO } from "../model/Music";

export class MusicController {
  async createMusic(req: Request, res: Response):Promise<void> {
    try {
      const input: MusicInputDTO = {
        title: req.body.title,
        album: req.body.album,
        genres: req.body.genres,
        file: req.body.file
      };

      await MusicBusiness.createMusic(
        input,
        req.headers.authorization as string
      );

      res.status(201).end();
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
  }

  async getMusic(req: Request, res: Response):Promise<void> {
    try {
      const filter: MusicFilterDTO = {
        artist: req.query.artist as string,
        album: req.query.album as string,
        genre: req.query.genre as string
      }

      const music: Music | Music[] = await MusicBusiness.getMusic(
        req.headers.authorization as string,
        filter,
        req.params.id
      );

      res.status(200).send({ music });
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
  }
}

export default new MusicController();