export type ExpiringTime = | '30M'
						   | '1H'
						   | '6H'
						   | '12H'
						   | '1D' 
						   | '2D'
						   | '7D'
						   | 'NEVER';

export type Invitation = {
	urlName: string;
	createdAt: string;
};