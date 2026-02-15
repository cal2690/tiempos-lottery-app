export type CountryCode = 'CR' | 'NI';

export const SCHEDULES: Record<CountryCode, { label: string; hour: number }[]> = {
  CR: [
    { label: '1:00 PM', hour: 13 },
    { label: '4:00 PM', hour: 16 },
    { label: '7:00 PM', hour: 19 },
    { label: '9:00 PM', hour: 21 },
  ],
  NI: [
    { label: '12:00 PM', hour: 12 },
    { label: '3:00 PM', hour: 15 },
    { label: '6:00 PM', hour: 18 },
    { label: '8:00 PM', hour: 20 },
  ],
};
