import { ActiveRaffle } from '../models/ActiveRaffle';
import { CountryCode } from '../constants/schedules';

export function createActiveRaffle(
  country: CountryCode,
  hour: number,
  label: string
): ActiveRaffle {
  const today = new Date().toISOString().split('T')[0];

  return {
    id: `${country}-${hour}-${today}`,
    country,
    hour,
    label,
    date: today,
  };
}
