/**
 * Utility to calculate Turkish Public Holidays.
 * Includes fixed dates and floating religious holidays.
 */

// Fixed date holidays
const fixedHolidays = [
  { day: 1, month: 0, name: 'Yılbaşı' },
  { day: 23, month: 3, name: 'Ulusal Egemenlik ve Çocuk Bayramı' },
  { day: 1, month: 4, name: 'Emek ve Dayanışma Günü' },
  { day: 19, month: 4, name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' },
  { day: 15, month: 6, name: 'Demokrasi ve Milli Birlik Günü' },
  { day: 30, month: 7, name: 'Zafer Bayramı' },
  { day: 29, month: 8, name: 'Cumhuriyet Bayramı' },
];

/**
 * Basic Hijri to Gregorian converter logic for Eid calculations.
 * For simplicity in this demo, we'll use a pre-calculated table for 2024-2030
 * but a real production app would use a more robust library or API.
 */
const religiousHolidays = {
  2024: [
    { day: 9, month: 3, name: 'Ramazan Bayramı Arefesi', half: true },
    { day: 10, month: 3, name: 'Ramazan Bayramı 1. Gün' },
    { day: 11, month: 3, name: 'Ramazan Bayramı 2. Gün' },
    { day: 12, month: 3, name: 'Ramazan Bayramı 3. Gün' },
    { day: 15, month: 5, name: 'Kurban Bayramı Arefesi', half: true },
    { day: 16, month: 5, name: 'Kurban Bayramı 1. Gün' },
    { day: 17, month: 5, name: 'Kurban Bayramı 2. Gün' },
    { day: 18, month: 5, name: 'Kurban Bayramı 3. Gün' },
    { day: 19, month: 5, name: 'Kurban Bayramı 4. Gün' },
  ],
  2025: [
    { day: 29, month: 2, name: 'Ramazan Bayramı Arefesi', half: true },
    { day: 30, month: 2, name: 'Ramazan Bayramı 1. Gün' },
    { day: 31, month: 2, name: 'Ramazan Bayramı 2. Gün' },
    { day: 1, month: 3, name: 'Ramazan Bayramı 3. Gün' },
    { day: 5, month: 5, name: 'Kurban Bayramı Arefesi', half: true },
    { day: 6, month: 5, name: 'Kurban Bayramı 1. Gün' },
    { day: 7, month: 5, name: 'Kurban Bayramı 2. Gün' },
    { day: 8, month: 5, name: 'Kurban Bayramı 3. Gün' },
    { day: 9, month: 5, name: 'Kurban Bayramı 4. Gün' },
  ],
  2026: [
    { day: 19, month: 2, name: 'Ramazan Bayramı Arefesi', half: true },
    { day: 20, month: 2, name: 'Ramazan Bayramı 1. Gün' },
    { day: 21, month: 2, name: 'Ramazan Bayramı 2. Gün' },
    { day: 22, month: 2, name: 'Ramazan Bayramı 3. Gün' },
    { day: 26, month: 4, name: 'Kurban Bayramı Arefesi', half: true },
    { day: 27, month: 4, name: 'Kurban Bayramı 1. Gün' },
    { day: 28, month: 4, name: 'Kurban Bayramı 2. Gün' },
    { day: 29, month: 4, name: 'Kurban Bayramı 3. Gün' },
    { day: 30, month: 4, name: 'Kurban Bayramı 4. Gün' },
  ]
};

export const getHolidays = (year) => {
  const yearFixed = fixedHolidays.map(h => ({
    ...h,
    date: new Date(year, h.month, h.day)
  }));
  
  const yearReligious = religiousHolidays[year] || [];
  const yearReligiousMapped = yearReligious.map(h => ({
    ...h,
    date: new Date(year, h.month, h.day)
  }));
  
  return [...yearFixed, ...yearReligiousMapped];
};

export const isHoliday = (date) => {
  const holidays = getHolidays(date.getFullYear());
  return holidays.find(h => 
    h.date.getDate() === date.getDate() && 
    h.date.getMonth() === date.getMonth()
  );
};
