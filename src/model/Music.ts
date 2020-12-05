export class Music {
  constructor(
    private id: string,
    private title: string,
    private authorId: string,
    private album: string,
    private file: string,
    private date?: Date,
  ){}

  getId(){
    return this.id;
  }

  getTitle(){
      return this.title;
  }

  getAuthorId(){
      return this.authorId;
  }

  getAlbum(){
      return this.album;
  }
  
  getFile(){
      return this.file;
  }
  
  getDate(){
      return this.date;
  }

  setId(id: string){
    this.id = id;
  }

  setTitle(title: string){
    this.title = title;
  }

  setAuthorId(authorId: string){
    this.authorId = authorId;
  }

  setAlbum(album: string){
    this.album = album;
  }

  setFile(file: string){
    this.file = file;
  }

  setDatedate(date: Date){
    this.date = date;
  }

  static toMusicModel(music: any): Music {
    return new Music(
      music.id,
      music.title,
      music.authorId,
      music.album,
      music.file,
      music.date
    )
  }
}

export interface MusicInputDTO {
  title: string;
  album: string;
  genres: string[];
  file: string;
}

export interface GenreDTO {
  id: string;
  name: string;
}

export interface MusicGenreDTO {
  musicId: string;
  genreId: string;
}