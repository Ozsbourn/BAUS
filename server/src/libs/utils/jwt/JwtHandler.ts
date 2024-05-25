import jwt from 'jsonwebtoken';
import { JwtError } from '../../types/jwtTypes';

class JwtHandler {
	private _key: string;

	// env here
	// constructor () { this._key = 'testjwtkey' };
	constructor () { this._key = 'testjwtkey' };

	generateToken = <Type>(payload: Type, hoursToExpiring: number) => {
		const date = new Date();
		date.setHours(date.getHours() + hoursToExpiring);
		return jwt.sign({...payload, expired: date.getTime()}, this._key);
	};
	verifyToken = (token: string, callback: (err: JwtError, payload: any) => void) => {
		jwt.verify(token, this._key, callback);
	};
};

export default new JwtHandler();