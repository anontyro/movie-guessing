import rawMovieData from '../consts/movieRawData';
import movieRawData from '../consts/movieRawData';
import { MovieDto } from '../dtos/movie.dto';
import createDataStore, { MemoryDataStore } from './dataStore';

describe('dataStore', () => {
  let store: MemoryDataStore = null;
  beforeEach(() => {
    store = createDataStore(movieRawData);
  });
  afterEach(() => {
    store.resetData(movieRawData);
  });

  it('basic store is created', () => {
    expect(store.getAllMovies().length).toBe(movieRawData.length);
    expect(store.getDataStore()).toBeTruthy();
  });

  it('getNextId will return the correct next id in the chain', () => {
    expect(store.getNextId()).toBe(movieRawData.length + 1);
  });

  it('getNoneGuessedMovies returns a subset of the list that have not been guessed', () => {
    const noneGuessedList = store.getNoneGuessedMovies();
    expect(noneGuessedList.length).toBeGreaterThan(0);
    expect(noneGuessedList.length).toBeLessThan(movieRawData.length);
  });

  it('getNoneGuessedMovies can be split into smaller return values using count', () => {
    const noneGuessed = store.getNoneGuessedMovies(10);
    expect(noneGuessed.length).toBeLessThanOrEqual(10);
  });

  it('getMovieByImdbId will return movies correctly based on their imdbId', () => {
    const hostel = store.getMovieByImdbId('tt0450278');
    expect(hostel.name).toBe('Hostel');
    expect(hostel.hasBeenGuessed).toBeFalsy();

    const bladesOfGlory = store.getMovieByImdbId('tt0445934');
    expect(bladesOfGlory.name).toBe('Blades Of Glory');
    expect(bladesOfGlory.id).toBe(100);
    expect(bladesOfGlory.hasBeenGuessed).toBeTruthy();
  });

  describe('addMovie', () => {
    afterEach(() => store.resetData(rawMovieData));
    const movie: MovieDto = {
      id: 0,
      name: 'Dumb and Dumber',
      imdbId: 'test123',
      createdAt: new Date(),
      dateGuessed: null,
      guesser: null,
      hasBeenGuessed: false,
      ignored: false,
      imdbUrl: 'test',
      releaseYear: 2000,
      type: '',
    };
    it('addMovie will add a new movie to the end of the list', () => {
      const id = store.getNextId();

      const dumbAndDumber = store.addMovie({
        ...movie,
        id,
      });

      expect(dumbAndDumber).toBeTruthy();
      expect(dumbAndDumber.id).toBe(id);
    });

    it('addMovie will be added as expected', () => {
      const id = store.getNextId();

      const dumbAndDumber = store.addMovie({
        ...movie,
        id,
      });

      expect(dumbAndDumber.guesser).toBe('');
      expect(dumbAndDumber.dateGuessed).toBe(null);
      expect(dumbAndDumber.releaseYear).toBe(2000);
    });

    it('addMovie will increase the size of the array and next id value', () => {
      const id = store.getNextId();
      store.addMovie({
        ...movie,
        id,
      });

      expect(store.getAllMovies().length).toBeGreaterThan(rawMovieData.length);
      expect(store.getNextId()).toBe(id + 1);
    });

    it('addMovie will not add the same movie twice', () => {
      const id = store.getNextId();
      store.addMovie({
        ...movie,
        id,
      });

      const exists = store.addMovie({
        ...movie,
        name: 'Dumber',
        id: id + 1,
      });

      expect(store.getAllMovies().length).toBe(rawMovieData.length + 1);
      expect(exists.name).toBe('Dumb and Dumber');
      expect(exists.id).toBe(id);
    });
  });

  it('entity has been parsed correctly and data carried over as expected', () => {
    const mazeRunner = store.getMovieByImdbId('tt1790864');

    expect(mazeRunner.id).toBe(19);
    expect(mazeRunner.imdbId).toBe('tt1790864');
    expect(mazeRunner.name).toBe('Maze Runner');
    expect(mazeRunner.releaseYear).toBe(2014);
    expect(mazeRunner.imdbUrl).toBe('https://www.imdb.com/title/tt1790864');
    expect(mazeRunner.hasBeenGuessed).toBeTruthy();
    expect(mazeRunner.guesser).toBe('Keng');
    expect(mazeRunner.dateGuessed).toStrictEqual(new Date('2021-06-18'));
    expect(mazeRunner.createdAt).toStrictEqual(new Date('2021-06-17'));
    expect(mazeRunner.type).toBe('');
    expect(mazeRunner.ignored).toBeFalsy;
  });
});
