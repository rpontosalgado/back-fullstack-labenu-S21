import BaseError from "../errors/BaseError";
import { MusicInputDTO } from "../model/Music";
import { AuthenticationData } from "../services/Authenticator";

export class MusicBusiness {


  async createMusic(music: MusicInputDTO, token: string): Promise<void> {
    try {
      const { title, album, genres, file } = music;

      const userData: AuthenticationData
    } catch (error) {
      const { code, message } = error;
      
      throw new BaseError(code || 400, message);
    }
  }
}