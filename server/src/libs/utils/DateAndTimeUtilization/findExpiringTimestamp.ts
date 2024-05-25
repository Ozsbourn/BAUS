import { ExpiringTime } from "../../types/invitationTypes";
import { toDays, toHours } from "./stringToTime";

const _expiringTimeMapper = new Map<ExpiringTime, number>([
	['30M', toDays(1/48)],
	['1H',  toDays(1/24)],
	['6H',  toDays(0.25)],
	['12H', toDays(0.5)],
	['1D',  toDays(1)], 
	['2D',  toDays(2)],
	['7D',  toDays(7)],
	['NEVER', 0]
]);
const _getExpiringTime = (duration: ExpiringTime) => { return _expiringTimeMapper.get(duration) || 0 };

export const findExpiringTimestamp = (datetime: string, duration: ExpiringTime) => {
	const origin = new Date(datetime);
	const expiringTime = origin.getTime() + _getExpiringTime(duration);
	return expiringTime;
};

export const findExpiringDate = (datetime: string, duration: ExpiringTime) => {
	const timestamp = findExpiringTimestamp(datetime, duration);
	const expiringDate = new Date(timestamp);
	return expiringDate;
};
