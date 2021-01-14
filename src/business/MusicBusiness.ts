import musicDatabase, { MusicDatabase } from "../data/MusicDatabase";
import BaseError from "../errors/BaseError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import { GenreDTO, Music, MusicGenreDTO, MusicInputDTO } from "../model/Music";
import authenticator, { AuthenticationData, Authenticator } from "../services/Authenticator";
import idGenerator, { IdGenerator } from "../services/IdGenerator";

export class MusicBusiness {
  constructor(
    private authenticator: Authenticator,
    private musicDatabase: MusicDatabase,
    private idGenerator: IdGenerator
  ){}

  async createMusic(music: MusicInputDTO, token: string): Promise<void> {
    try {
      const { title, album, genres, file } = music;

      const userData: AuthenticationData = this.authenticator.getData(token);

      if (!title || !album || !genres.length || !file) {
        throw new UnprocessableEntityError("Missing inputs");
      }

      const genresFromDB: GenreDTO[]
        = await this.musicDatabase.getGenresByName(genres);

      const genreNames: string[] = genresFromDB.map(
        (genre:GenreDTO) => genre.name
      );

      const newGenres: GenreDTO[] = [];

      genres.forEach(async (genre: string) => {
        if (!genreNames.includes(genre.toLowerCase())) {
          const genreId: string = this.idGenerator.generate();
          
          const newGenre: GenreDTO = { id: genreId, name: genre.toLowerCase() };

          await musicDatabase.createGenre(newGenre);

          newGenres.push(newGenre);
        }
      });

      const musicId: string = this.idGenerator.generate();

      const musicGenres: MusicGenreDTO[] = [
        ...genresFromDB,
        ...newGenres
      ].map((item: GenreDTO) => ({
        musicId,
        genreId: item.id
      }));

      await this.musicDatabase.addGenresToMusic(musicGenres);

      await this.musicDatabase.createMusic(
        new Music(
          musicId,
          title,
          userData.id,
          album,
          file
        )
      )
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
        message === "jwt expired" ||
        message === "invalid token"
      ) {
        throw new UnauthorizedError("Invalid credentials");
      }
      
      throw new BaseError(code || 400, message);
    }
  }

  async getMusic(token: string, musicId?: string): Promise<Music | Music[]> {
    try {
      const userData: AuthenticationData = this.authenticator.getData(token);

      if (!musicId) {
        const music: Music[]
          = await this.musicDatabase.getAllMusic(userData.id);

        return music
      }

      const music: Music = await this.musicDatabase.getMusicById(musicId);

      if(!music) {
        throw new NotFoundError("Music not found");
      }

      return music
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
        message === "jwt expired" ||
        message === "invalid token"
      ) {
        throw new UnauthorizedError("Invalid credentials");
      }
      
      throw new BaseError(code || 400, message);
    }
  }
}

export default new MusicBusiness(
  authenticator,
  musicDatabase,
  idGenerator
)