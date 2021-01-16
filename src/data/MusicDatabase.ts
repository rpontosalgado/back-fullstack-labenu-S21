import BaseError from "../errors/BaseError";
import { GenreDTO, Music, MusicGenreDTO } from "../model/Music";
import BaseDatabase from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

  async getGenresByName(genres: string[]): Promise<GenreDTO[]> {
    try {
      const result: GenreDTO[] = await this.getConnection()
        .select()
        .from(this.tableNames.genres)
        .whereIn('name', genres);

      return result;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async createGenre(genre: GenreDTO): Promise<void> {
    try {
      await this.getConnection()
        .insert(genre)
        .into(this.tableNames.genres);
    } catch (error) {
       throw new Error(error.sqlMessage || error.message);
    }
  }

  async addGenresToMusic(musicGenres: MusicGenreDTO[]): Promise<void> {
    try {
      await this.getConnection()
        .insert(musicGenres.map((item: MusicGenreDTO) => ({
          music_id: item.musicId,
          genre_id: item.genreId
        })))
        .into(this.tableNames.musicGenres);
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

  async getAllMusic(): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select('m.*', 'u.name')
        .from(`${this.tableNames.music} as m`)
        .join(`${this.tableNames.users} as u`,'m.author_id','u.id')
        .orderBy("m.date", "desc");

      return result.map((music: any) => Music.toMusicModel(music));
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getMusicById(musicId: string): Promise<Music> {
    try {
      const result = await this.getConnection()
        .select('m.*', 'u.name')
        .from(`${this.tableNames.music} as m`)
        .join(`${this.tableNames.users} as u`,'m.author_id','u.id')
        .where("m.id", musicId);

      return Music.toMusicModel(result[0]);
    } catch (error) {
      const { code, message, sqlMessage } = error;

      throw new BaseError(code || 400, sqlMessage || message);
    }
  }

  async getMusicGenresById(musicId: string): Promise<string[]> {
    try {
      const result = await this.getConnection()
        .select('g.name')
        .from(`${this.tableNames.musicGenres} as mg`)
        .join(`${this.tableNames.genres} as g`,'mg.genre_id','g.id')
        .where("mg.music_id", musicId);
      
      return result.map(genre => genre.name);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getMusicByGenreName(genre: string): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select('m.*', 'u.name')
        .from(`${this.tableNames.musicGenres} as mg`)
        .join(`${this.tableNames.genres} as g`,'mg.genre_id','g.id')
        .join(`${this.tableNames.music} as m`,'mg.music_id','m.id')
        .join(`${this.tableNames.users} as u`,'m.author_id','u.id')
        .where('g.name', genre);

      return result.map((music: any) => Music.toMusicModel(music));
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getMusicByAlbumName(album: string): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select('m.*', 'u.name')
        .from(`${this.tableNames.music} as m`)
        .join(`${this.tableNames.users} as u`,'m.author_id','u.id')
        .where('m.album', album);

      return result.map((music: any) => Music.toMusicModel(music));
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }


  async getMusicByArtistName(artist: string): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select('m.*', 'u.name')
        .from(`${this.tableNames.music} as m`)
        .join(`${this.tableNames.users} as u`,'m.author_id','u.id')
        .where('u.name', artist);

      return result.map((music: any) => Music.toMusicModel(music));
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  
}

export default new MusicDatabase();