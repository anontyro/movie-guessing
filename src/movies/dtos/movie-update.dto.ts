export class MovieUpdateDto {
  public readonly id?: number;
  public readonly imdbId: string;
  public readonly name?: string;
  public readonly releaseYear?: number;
  public readonly imdbUrl?: string;
  public readonly hasBeenGuessed: boolean;
  public readonly guesser: string;
  public readonly dateGuessed: Date;
  public readonly createdAt?: Date;
  public readonly type?: string;
  public readonly ignored?: boolean;
}
