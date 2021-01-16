import BaseError from "../errors/BaseError";
import { Music } from "../model/Music";
import { Playlist, PlaylistMusicDTO } from "../model/Playlist";
import BaseDatabase from "./BaseDatabase";

export class PlaylistDatabase extends BaseDatabase {

  async createPlaylist(playlist: Playlist): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: playlist.getId(),
          creator_id: playlist.getCreatorId(),
          title: playlist.getTitle(),
          subtitle: playlist.getSubtitle(),
          image: playlist.getImage()
        })
        .into(this.tableNames.playlist);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async addMusicToPlaylist(playlistMusic: PlaylistMusicDTO): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          playlist_id: playlistMusic.playlistId,
          music_id: playlistMusic.musicId
        })
        .into(this.tableNames.playlistMusic);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserPlaylists(userId: string): Promise<Playlist[]> {
    try {
      const result = await this.getConnection()
        .select('*')
        .from(this.tableNames.playlist)
        .where('creator_id', userId);
      
      return result.map(
        (playlist: any) => Playlist.toPlaylistModel(playlist)
      );
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getPlaylistById(playlistId: string): Promise<Playlist> {
    try {
      const result = await this.getConnection()
        .select('p.*', 'u.name')
        .from(`${this.tableNames.playlist} as p`)
        .join(`${this.tableNames.users} as u`, 'p.creator_id', 'u.id')
        .where("p.id", playlistId);

      return Playlist.toPlaylistModel(result[0]);
    } catch (error) {
      const { code, message, sqlMessage } = error;

      throw new BaseError(code || 400, sqlMessage || message);
    }
  }

  async getPlaylistMusic(playlistId: string): Promise<Music[]> {
    try {
      const result = await this.getConnection()
        .select('m.*', 'u.name')
        .from(`${this.tableNames.playlistMusic} as pm`)
        .join(`${this.tableNames.music} as m`, 'pm.music_id', 'm.id')
        .join(`${this.tableNames.users} as u`, 'm.author_id', 'u.id')
        .where("pm.playlist_id", playlistId);

      return result.map((music: any) => Music.toMusicModel(music));
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async deleteMusicFromPlaylist(
    playlistMusic: PlaylistMusicDTO
  ): Promise<void> {
    try {
      await this.getConnection()
        .from(this.tableNames.playlistMusic)
        .where({
          playlist_id: playlistMusic.playlistId,
          music_id: playlistMusic.musicId
        })
        .del();
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

}

export default new PlaylistDatabase();