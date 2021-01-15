import playlistDatabase, { PlaylistDatabase } from "../data/PlaylistDatabase";
import BaseError from "../errors/BaseError";
import ConflictError from "../errors/ConflictError";
import UnauthorizedError from "../errors/UnauthorizedError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import { Playlist, PlaylistInputDTO } from "../model/Playlist";
import authenticator, { AuthenticationData, Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";

export class PlaylistBusiness {
  constructor(
    private authenticator: Authenticator,
    private playlistDatabase: PlaylistDatabase,
    private idGenerator: IdGenerator
  ){}

  async createPlaylist(playlist: PlaylistInputDTO, token: string): Promise<void> {
    try {
      const { title, subtitle, image } = playlist;

      const userData: AuthenticationData = this.authenticator.getData(token);

      if (!title || !subtitle || !image) {
        throw new UnprocessableEntityError("Missing inputs");
      }

      const playlistId: string = this.idGenerator.generate();

      await this.playlistDatabase.createPlaylist(
        new Playlist(
          playlistId,
          userData.id,
          title,
          subtitle,
          image
        )
      )
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
        message === "invalid token"
      ) {
        throw new UnauthorizedError("Invalid credentials");
      }

      if (error.message.includes("Duplicate entry")) {
        throw new ConflictError(
          "This user has already created a playlist with this title"
        );
      }
      
      throw new BaseError(code || 400, message);
    }
  }
}

export default new PlaylistBusiness(
  authenticator,
  playlistDatabase,
  idGenerator
)