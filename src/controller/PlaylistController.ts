import { Request, Response } from "express";
import PlaylistBusiness from "../business/PlaylistBusiness";
import {
  Playlist, PlaylistInputDTO, PlaylistMusicDTO
} from "../model/Playlist";

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

  async addMusicToPlaylist(req: Request, res: Response):Promise<void> {
    try {
      const input: PlaylistMusicDTO = {
        playlistId: req.body.playlistId,
        musicId: req.body.musicId
      };

      await PlaylistBusiness.addMusicToPlaylist(
        input,
        req.headers.authorization as string
      );

      res.status(201).end();
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
  }

  async getPlaylist(req: Request, res: Response):Promise<void> {
    try {
      const playlist: Playlist | Playlist []
        = await PlaylistBusiness.getPlaylist(
          req.headers.authorization as string,
          req.params.id
        );

        res.status(200).send({playlist});
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
  }

  async deleteMusicFromPlaylist(req: Request, res: Response):Promise<void> {
    try {
      const input: PlaylistMusicDTO = {
        playlistId: req.params.playlistId,
        musicId: req.params.musicId
      };

      await PlaylistBusiness.addMusicToPlaylist(
        input,
        req.headers.authorization as string
      );

      res.status(200).send("Music removed from playlist");
    } catch (error) {
      const { code, message } = error;
      res.status(code || 400).send({ message });
    }
  }
}

export default new PlaylistController();