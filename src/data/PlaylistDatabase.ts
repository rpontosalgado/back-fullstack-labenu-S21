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

}

export default new PlaylistDatabase();