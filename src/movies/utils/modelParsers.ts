import { MovieDto } from '../dtos/movie.dto';
import { Movie } from '../entities/movie.entity';
import { MovieBusinessModel } from '../models/movie.businessmodel';
import { getDateOrNull } from './dateUtils';
import { format } from 'date-fns';
import { MovieOutputBusinessModel } from '../models/movieoutput.businessmodel';

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
  output.ImdbId = asString<string>(data.imdbId);
  output.Name = asString<string>(data.name);
  output.ReleaseYear = asString<number>(data.releaseYear);
  output.ImdbUrl = asString<string>(data.imdbUrl);
  output.HasBeenGuessed = asString<boolean>(data.hasBeenGuessed);
  output.Guesser = asString<string>(data.guesser);
  output.DateGuessed = asString<Date>(data.dateGuessed);
  output.CreatedAt = asString<Date>(data.createdAt);
  output.Type = asString<string>(data.type);
  output.Ignored = asString<boolean>(data.ignored);
  output.Weight = asString<number>(data.weight);

  return output;
};

export const parseEntitiesToBusinessModels = (
  data: Movie[],
): MovieBusinessModel[] => {
  const output = data.map((entity) => {
    const item = new MovieBusinessModel();
    item.id = +entity.Id;
    item.imdbId = entity.ImdbId;
    item.name = entity.Name;
    item.releaseYear = +entity.ReleaseYear;
    item.imdbUrl = entity.ImdbUrl;
    item.hasBeenGuessed = !!+entity.HasBeenGuessed;
    item.guesser = entity.Guesser;
    item.dateGuessed = getDateOrNull(entity.DateGuessed);
    item.createdAt = getDateOrNull(entity.CreatedAt);
    item.type = entity.Type;
    item.ignored = !!+entity.Ignored;
    item.weight = +entity.Weight;

    return item;
  });

  return output;
};

export const parseBusinessModelsToOutputBusinessModels = (
  data: MovieBusinessModel[],
): MovieOutputBusinessModel[] => {
  const output = data.map((model) => {
    const item = new MovieOutputBusinessModel();
    item.imdbId = model.imdbId;
    item.name = model.name;
    item.releaseYear = model.releaseYear;
    item.imdbUrl = model.imdbUrl;
    item.hasBeenGuessed = model.hasBeenGuessed;
    item.guesser = model.guesser;
    item.dateGuessed = model.dateGuessed;
    item.createdAt = model.createdAt;
    item.type = model.type;
    item.ignored = model.ignored;
    item.weight = model.weight;

    return item;
  });

  return output;
};

export const parseDtoToBusinessModel = (
  data: Partial<MovieDto>,
): MovieBusinessModel => {
  const item = new MovieBusinessModel();
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
  item.weight = data.weight ?? null;
  return item;
};
