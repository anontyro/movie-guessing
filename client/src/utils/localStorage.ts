import MoveListStore from '../interfaces/MovieListStore';

const STORE_KEYS = {
  API_TOKEN: 'API_TOKEN',
  MOVIES_THIS_WEEK: 'MOVIES_THIS_WEEK',
};

interface StorageItem<T> {
  dataStored: Date;
  items: T;
}

const clearKeyFromLocalStorage = <T>(key: string): T | null => {
  const items = getFromLocalStorage<T>(key);
  if (!items) {
    return null;
  }

  localStorage.removeItem(key);
  return items;
};

const addToLocalStorage = <T>(items: T, key: string) => {
  const storageItem: StorageItem<T> = {
    dataStored: new Date(),
    items,
  };

  const parsedItem = JSON.stringify(storageItem);
  localStorage.setItem(key, parsedItem);
};

const getFromLocalStorage = <T>(key: string): T | null => {
  const items = localStorage.getItem(key);
  if (!items) {
    return null;
  }
  const parseItems: StorageItem<T> = JSON.parse(items);

  return parseItems.items;
};

export const getMoviesFromStorage = (): MoveListStore | null =>
  getFromLocalStorage<MoveListStore>(STORE_KEYS.MOVIES_THIS_WEEK);
export const clearMovieStorage = () =>
  clearKeyFromLocalStorage(STORE_KEYS.MOVIES_THIS_WEEK);
export const addMoviesToStorage = (movieList: MoveListStore) =>
  addToLocalStorage<MoveListStore>(movieList, STORE_KEYS.MOVIES_THIS_WEEK);

export const addTokenToStorage = (token: string) =>
  addToLocalStorage(token, STORE_KEYS.API_TOKEN);
export const getTokenFromStorage = (): string | null =>
  getFromLocalStorage<string>(STORE_KEYS.API_TOKEN);
export const clearTokenStorage = () =>
  clearKeyFromLocalStorage(STORE_KEYS.API_TOKEN);
