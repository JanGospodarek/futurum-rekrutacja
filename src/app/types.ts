export type City =
  | 'Warszawa'
  | 'Kraków'
  | 'Łódź'
  | 'Wrocław'
  | 'Poznań'
  | 'Gdańsk'
  | 'Szczecin'
  | 'Bydgoszcz';

export interface Campaign {
  id: string;
  name: string;
  keywords: string[];
  bidAmount: number;
  fundAmount: number;
  status: 'on' | 'off';
  town: City;
  radius: number;
}
export interface InitialState {
  campaigns: Campaign[];
  balance: number;
}
