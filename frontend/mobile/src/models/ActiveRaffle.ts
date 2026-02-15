import { CountryCode } from '../constants/schedules';

export interface ActiveRaffle {
  id: string;
  country: CountryCode;
  hour: number;
  label: string;
  date: string;
}
