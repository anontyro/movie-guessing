import { MovieDto } from '../dtos/movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieBusinessModel } from '../models/movie.businessmodel';
import { getDateOrNull } from './dateUtils';
import { format } from 'date-fns';

const asString = <T>(item: T): string => {
  if (typeof item === 'boolean') {
    return item ? '1' : '0';
  }
  if (!item) {
    return '';
  }

  if (item instanceof Date) {
    return format(item, 'yyyy-MM-dd');
  }

  return `${item}`;
};

export const parseBusinessModelToEntity = (
  data: Partial<MovieBusinessModel>,
): Movie => {
  const output = new Movie();
  output.Id = asString<number>(data.id);
  output.ImbdId = asString<string>(data.imdbId);
  output.Name = asString<string>(data.name);
  output.ReleaseYear = asString<number>(data.releaseYear);
  output.ImdbUrl = asString<string>(data.imdbUrl);
  output.HasBeenGuessed = asString<boolean>(data.hasBeenGuessed);
  output.Guesser = asString<string>(data.guesser);
  output.DateGuessed = asString<Date>(data.dateGuessed);
  output.CreatedAt = asString<Date>(data.createdAt);
  output.Type = asString<string>(data.type);
  output.Ignored = asString<boolean>(data.ignored);

  return output;
};

export const parseEntitiesToBusinessModels = (
  data: Movie[],
): MovieBusinessModel[] => {
  const output = data.map((entity) => {
    const item = new MovieBusinessModel();
    item.id = +entity.Id;
    item.imdbId = entity.ImbdId;
    item.name = entity.Name;
    item.releaseYear = +entity.ReleaseYear;
    item.imdbUrl = entity.ImdbUrl;
    item.hasBeenGuessed = !!+entity.HasBeenGuessed;
    item.guesser = entity.Guesser;
    item.dateGuessed = getDateOrNull(entity.DateGuessed);
    item.createdAt = getDateOrNull(entity.CreatedAt);
    item.type = entity.Type;
    item.ignored = !!+entity.Ignored;

    return item;
  });

  return output;
};

export const parseDtoToBusinessModel = (
  data: Partial<MovieDto>,
): MovieBusinessModel => {
  const item = new MovieBusinessModel();
  item.id = data.id;
  item.imdbId = data.imdbId;
  item.name = data.name;
  item.releaseYear = data.releaseYear ?? 0;
  item.imdbUrl = data.imdbUrl ?? '';
  item.hasBeenGuessed = false;
  item.guesser = '';
  item.dateGuessed = null;
  item.createdAt = new Date();
  item.type = data.type;
  item.ignored = false;

  return item;
};
