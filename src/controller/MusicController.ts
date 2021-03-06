import { Request, Response } from "express";
import MusicBusiness from "../business/MusicBusiness";
import BaseDatabase from "../data/BaseDatabase";
import { AlbumDTO, Music, MusicFilterDTO, MusicInputDTO } from "../model/Music";

export class MusicController {
  async createMusic(req: Request, res: Response): Promise<void> {
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
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getMusic(req: Request, res: Response): Promise<void> {
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
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getGenreNames(req: Request, res: Response): Promise<void> {
    try {
      const genres: string[] = await MusicBusiness.getGenreNames(
        req.headers.authorization as string
      );

      res.status(200).send({ genres });
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getAlbums(req: Request, res: Response): Promise<void> {
    try {
      const albums: AlbumDTO[] = await MusicBusiness.getAlbums(
        req.headers.authorization as string
      );

      res.status(200).send({ albums });
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }

  async getArtistNames(req: Request, res: Response): Promise<void> {
    try {
      const artists: string[] = await MusicBusiness.getArtistNames(
        req.headers.authorization as string
      );

      res.status(200).send({ artists });
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}

export default new MusicController();