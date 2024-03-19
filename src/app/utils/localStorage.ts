import { InitialState } from '../types';

export const wrtieToLocalStorage = (state: InitialState) => {
  localStorage.clear();
  localStorage.setItem('state', JSON.stringify(state));
};
export const readFromLocalStorage = () => {
  const state = localStorage.getItem('state');
  if (state) return JSON.parse(state);
  return undefined;
};
