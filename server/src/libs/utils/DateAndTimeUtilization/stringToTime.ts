export const toSeconds = (val: number) => {
	return val * 1000;
};

export const toMins = (val: number) => {
	return toSeconds(val) * 60;
};

export const toHours = (val: number) => {
	return toMins(val) * 60;
};

export const toDays = (val: number) => {
	return toHours(val) * 24;
};