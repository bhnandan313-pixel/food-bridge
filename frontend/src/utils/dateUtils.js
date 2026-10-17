export const formatRelativeTime = (isoDate) => {
  if (!isoDate) return '';
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = date - now;

  if (diffMs < 0) return 'Expired';
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
};

export const isEndingSoon = (isoDate, thresholdHours = 2) => {
  if (!isoDate) return false;
  const now = new Date();
  const date = new Date(isoDate);
  const diffHours = (date - now) / (1000 * 60 * 60);
  return diffHours > 0 && diffHours <= thresholdHours;
};
