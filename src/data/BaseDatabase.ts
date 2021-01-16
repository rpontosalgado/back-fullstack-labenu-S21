import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

export default abstract class BaseDatabase {

  private static connection: knex | null = null;

  protected tableNames = {
    users: "S21_USERS",
    music: "S21_MUSIC",
    genres: "S21_GENRES",
    musicGenres: "S21_MUSIC_GENRES",
    playlist: "S21_PLAYLIST",
    playlistMusic: "S21_PLAYLIST_MUSIC"
  }

  protected getConnection(): knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        }
      });
    }

    return BaseDatabase.connection;
  }

  public static async destroyConnection(): Promise<void> {
    if (BaseDatabase.connection) {
      await BaseDatabase.connection.destroy();
      BaseDatabase.connection = null;
    }
  }
}