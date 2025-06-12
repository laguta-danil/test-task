export const formatTransactionDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Reset time for accurate day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const transactionDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffTime = today.getTime() - transactionDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays > 1 && diffDays <= 6) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
};

export const getCurrentSeason = (): 'spring' | 'summer' | 'fall' | 'winter' => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'fall';
  return 'winter';
};

export const getSeasonStartDate = (season: string): Date => {
  const year = new Date().getFullYear();
  switch (season) {
    case 'spring':
      return new Date(year, 2, 1); // March 1
    case 'summer':
      return new Date(year, 5, 1); // June 1
    case 'fall':
      return new Date(year, 8, 1); // September 1
    case 'winter':
      return new Date(year, 11, 1); // December 1
    default:
      return new Date(year, 0, 1);
  }
};

export const getDayOfSeason = (): number => {
  const season = getCurrentSeason();
  const seasonStart = getSeasonStartDate(season);
  const today = new Date();
  const diffTime = today.getTime() - seasonStart.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
