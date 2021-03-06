import musicDatabase, { MusicDatabase } from "../data/MusicDatabase";
import BaseError from "../errors/BaseError";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";
import UnprocessableEntityError from "../errors/UnprocessableEntityError";
import {
  AlbumDTO, GenreDTO, Music, MusicFilterDTO, MusicGenreDTO, MusicInputDTO
} from "../model/Music";
import authenticator, {
  AuthenticationData, Authenticator
} from "../services/Authenticator";
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

      let newGenres: GenreDTO[] = [];

      for (const genre of genres) {
        if (!genreNames.includes(genre.toLowerCase())) {
          const genreId: string = this.idGenerator.generate();
          
          const newGenre: GenreDTO = {
            id: genreId,
            name: genre.toLowerCase()
          };

          newGenres.push(newGenre);
          
          await musicDatabase.createGenre(newGenre);
        }
      }

      const musicId: string = this.idGenerator.generate();

      const musicGenres: MusicGenreDTO[] = [
        ...genresFromDB,
        ...newGenres
      ].map((item: GenreDTO) => ({
        musicId,
        genreId: item.id
      }));
      
      await this.musicDatabase.createMusic(
        new Music(
          musicId,
          title,
          userData.id,
          album,
          file
        )
      )
          
      await this.musicDatabase.addGenresToMusic(musicGenres);
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
          "This album already has a music with this title"
        );
      }
      
      throw new BaseError(code || 400, message);
    }
  }

  async getMusic(
    token: string,
    filter: MusicFilterDTO,
    musicId?: string
  ): Promise<Music | Music[]> {
    try {
      this.authenticator.getData(token);

      const { artist, album, genre } = filter;

      if (!musicId) {
        if (artist && !album && !genre) {
          const music: Music[]
            = await this.musicDatabase.getMusicByArtistName(artist);

          for (const item of music) {
            const musicGenres: string[]
              = await this.musicDatabase.getMusicGenresById(item.getId());

            item.setGenres(musicGenres);
          }

          return music;
        }

        if (!artist && album && !genre) {
          const music: Music[]
            = await this.musicDatabase.getMusicByAlbumName(album);
  
          for (const item of music) {
            const musicGenres: string[]
              = await this.musicDatabase.getMusicGenresById(item.getId());
  
            item.setGenres(musicGenres);
          }
  
          return music;
        }

        if (!artist && !album && genre) {
          const music: Music[]
            = await this.musicDatabase.getMusicByGenreName(genre);
  
          for (const item of music) {
            const musicGenres: string[]
              = await this.musicDatabase.getMusicGenresById(item.getId());
  
            item.setGenres(musicGenres);
          }
  
          return music;
        }

        const music: Music[]
          = await this.musicDatabase.getAllMusic();

        for (const item of music) {
          const musicGenres: string[]
            = await this.musicDatabase.getMusicGenresById(item.getId());

          item.setGenres(musicGenres);
        }

        return music;
      }

      const music: Music = await this.musicDatabase.getMusicById(musicId);

      if(!music) {
        throw new NotFoundError("Music not found");
      }

      const musicGenres: string[]
        = await musicDatabase.getMusicGenresById(music.getId());

      music.setGenres(musicGenres);

      return music;
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
        message === "invalid token"
      ) {
        throw new UnauthorizedError("Invalid credentials");
      }
      
      throw new BaseError(code || 400, message);
    }
  }

  async getGenreNames(token: string): Promise<string[]> {
    try {
      this.authenticator.getData(token);

      const genres: string[] = await this.musicDatabase.getGenreNames();

      return genres;
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
        message === "invalid token"
      ) {
        throw new UnauthorizedError("Invalid credentials");
      }
      
      throw new BaseError(code || 400, message);
    }
  }

  async getAlbums(token: string): Promise<AlbumDTO[]> {
    try {
      this.authenticator.getData(token);

      const albums: AlbumDTO[] = await this.musicDatabase.getAlbums();

      return albums;
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
        message === "invalid token"
      ) {
        throw new UnauthorizedError("Invalid credentials");
      }
      
      throw new BaseError(code || 400, message);
    }
  }

  async getArtistNames(token: string): Promise<string[]> {
    try {
      this.authenticator.getData(token);

      const artists: string[] = await this.musicDatabase.getArtistNames();

      return artists;
    } catch (error) {
      const { code, message } = error;

      if (
        message === "jwt must be provided" ||
        message === "jwt malformed" ||
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
);