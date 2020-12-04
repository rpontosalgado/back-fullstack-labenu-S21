import { GenreDTO, Music, MusicGenreDTO } from "../model/Music";
import BaseDatabase from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

  async getGenresByName(genres: string[]): Promise<GenreDTO[]> {
    try {
      const result: GenreDTO[] = await this.getConnection()
        .select()
        .from(this.tableNames.genres)
        .whereIn('name', genres)

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async createGenre(genres: GenreDTO[]): Promise<void> {
    try {
      await this.getConnection()
        .insert(genres)
        .into(this.tableNames.genres)
    } catch (error) {
       throw new Error(error.sqlMessage || error.message);
    }
  }

  async addGenresToMusic(musicGenres: MusicGenreDTO[]): Promise<void> {
    try {
      await this.getConnection()
        .insert(musicGenres)
        .into(this.tableNames.musicGenres)
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async createMusic(music: Music): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: music.getId(),
          title: music.getTitle(),
          author_id: music.getAuthorId(),
          album: music.getAlbum(),
          file: music.getFile()
        })
        .into(this.tableNames.music);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}