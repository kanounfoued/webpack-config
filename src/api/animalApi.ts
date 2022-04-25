import api from './api';

const URLS = {
  fetchDogURL: 'breeds/image/random',
  fetchCatURL: 'images/search?format=json',
};

export type DOG_DATA = {
  message: string;
  status: 'success' | 'error';
};

export function fetchDog() {
  return api.get<DOG_DATA>(URLS.fetchDogURL, {
    baseURL: 'https://dog.ceo/api/',
  });
}

export type CAT_DATA = {
  breeds: [];
  height: number;
  id: string;
  url: string;
  width: number;
}[];

export function fetchCat() {
  return api.get<CAT_DATA>(URLS.fetchCatURL, {
    baseURL: 'https://api.thecatapi.com/v1/',
  });
}
