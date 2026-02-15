import { SCHEDULES, CountryCode } from '../constants/schedules';

export function getAvailableSchedules(country: CountryCode) {
  const now = new Date();
  const currentHour = now.getHours();

  return SCHEDULES[country].filter(schedule => {
    return schedule.hour > currentHour;
  });
}
