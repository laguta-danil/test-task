import { getDayOfSeason } from './dateHelpers';

export const calculateDailyPoints = (): number => {
  const dayOfSeason = getDayOfSeason();

  if (dayOfSeason === 1) return 2;
  if (dayOfSeason === 2) return 3;

  // For day 3 and onwards: 100% of previous day + 60% of day before that
  let prevDay = 2; // day 1
  let currentDay = 3; // day 2

  for (let day = 3; day <= dayOfSeason; day++) {
    const newPoints = Math.round(currentDay + prevDay * 0.6);
    prevDay = currentDay;
    currentDay = newPoints;
  }

  return currentDay;
};

export const formatPoints = (points: number): string => {
  if (points >= 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
};
