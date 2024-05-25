import { ExpiringDuration } from '../types/groupTypes/invites';

type APIReadyExpiringDuration = '30M' | '1H' | '6H' | '12H' | '1D' | '2D' | '7D' | 'NEVER';

const _ExpiringTimeMap = new Map<ExpiringDuration, APIReadyExpiringDuration>([
  ['30 Minutes', '30M'],
  ['1 Hour', '1H'],
  ['6 Hours', '6H'],
  ['12 Hours', '12H'],
  ['1 Day', '1D'],
  ['2 Days', '2D'],
  ['7 Days', '7D'],
  ['Never', 'NEVER'],
]);

export const getExpiringTime = (duration: ExpiringDuration) => {
  const res: APIReadyExpiringDuration = _ExpiringTimeMap.get(duration) || '1H';
  return res;
};
