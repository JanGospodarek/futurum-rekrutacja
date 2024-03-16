export type City =
  | 'Warszawa'
  | 'Kraków'
  | 'Gdańsk'
  | 'Wrocław'
  | 'Poznań'
  | 'Szczecin'
  | 'Lublin';
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
