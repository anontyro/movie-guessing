import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import rawMovieData from '../../../movies/consts/movieRawData';
import { HttpFetchService } from '../../../common/http-fetch/http-fetch.service';
import { Movie } from '../../entities/movie.entity';

@Injectable()
export class DataService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpFetch: HttpFetchService,
  ) {}

  public async GetMoviesFromServer(): Promise<Movie[]> {
    const useMockData =
      this.configService.get<string>('USE_MOCK_DATA', '') === 'true'
        ? true
        : false;
    const nodeEnv = this.configService.get<string>('NODE_ENV');

    if (useMockData && nodeEnv === 'development') {
      const mockData = rawMovieData;
      return mockData;
    }

    const endpoint = this.configService.get<string>('SHEET_BEST_URL');
    const data = await this.httpFetch.getHttp<Movie[]>(endpoint);

    return data;
  }

  public async UpdateMovieOnServer(movie: Partial<Movie>, imdbId: string) {
    const endpoint = `${this.configService.get<string>(
      'SHEET_BEST_URL',
    )}/ImdbId/*${imdbId}*`;

    const data = await this.httpFetch.patchHttp<Partial<Movie>>(
      endpoint,
      movie,
    );

    return data;
  }

  public async AddMovieOnServer(movie: Movie) {
    const endpoint = this.configService.get<string>('SHEET_BEST_URL');
    const data = await this.httpFetch.postHttp<Movie>(endpoint, movie);

    return data;
  }
}
