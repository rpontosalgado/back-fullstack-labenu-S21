import { Music } from "./Music";

export class Playlist {
  constructor(
    private id: string,
    private creatorId: string,
    private title: string,
    private subtitle?: string,
    private image?: string,
    private creatorName?: string,
    private music: Music[] = []
  ){}

  getId(){
    return this.id;
  }

  getCreatorId(){
    return this.creatorId;
  }

  getTitle(){
    return this.title;
  }

  getSubtitle(){
    return this.subtitle;
  }

  getImage(){
    return this.image;
  }

  getCreatorName(){
    return this.creatorName;
  }

  getMusic(){
    return this.music;
  }

  setId(id: string){
    this.id = id;
  }

  setCreatorId(creatorId: string){
    this.creatorId = creatorId;
  }

  setTitle(title: string){
    this.title = title;
  }

  setSubtitle(subtitle: string){
    this.subtitle = subtitle;
  }

  setImage(image: string){
    this.image = image;
  }

  setCreatorName(creatorName: string){
    this.creatorName = creatorName;
  }

  setMusic(music: Music[]){
    this.music = music;
  }

  static toPlaylistModel(playlist: any): Playlist {
    return new Playlist(
      playlist.id,
      playlist.creator_id,
      playlist.title,
      playlist.subtitle,
      playlist.image,
      playlist.name
    )
  }
}

export interface PlaylistInputDTO {
  title: string;
  subtitle: string | undefined;
  image: string | undefined;
}

export interface PlaylistMusicDTO {
  playlistId: string;
  musicId: string;
}