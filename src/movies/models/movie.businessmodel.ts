export class MovieBusinessModel {
  public id: number;
  public imdbId: string;
  public name: string;
  public releaseYear: number;
  public imdbUrl: string;
  public hasBeenGuessed: boolean;
  public guesser: string;
  public dateGuessed: Date;
  public createdAt: Date;
  public type: string;
  public ignored: boolean;
}
