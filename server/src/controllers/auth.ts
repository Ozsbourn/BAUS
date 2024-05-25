import '../libs/envLoader';

import { User } from "@prisma/client";
import { db } from "../db/db";
import bcrypt from "bcryptjs";
import jwt    from "jsonwebtoken";
import { _findUsers } from "./utils";
import { UserResponseJson } from "../configs/responseJson/userResponses";
import { GeneralResponses } from "../configs/responseJson/generalResponses";
import { UserPlaceHolders } from '../configs/placeholders/userPlaceholders';
import { Cookies } from '../configs/cookies/cookies';
import { Request, Response } from 'express';
import { JwtPayload } from '../libs/types/jwtTypes';

export const register = async (req: Request, res: Response) => {
	const checker = await _findUsers(req.body.login, req.body.email);
	if (checker) {
		res.status(400).json(UserResponseJson.UserExist);
	} else {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const newUser: User = await db.user.create({
			data: {
				email: req.body.email,
				name:  req.body.name,

				login:    req.body.login,
				passHash: hash,

				// should be more right way for placheolders
				avatarUrl: UserPlaceHolders.AvatarPlaceholder,

				status: req.body.status,
			},
		});

		if (newUser) {
			res.status(200).json({
				email: newUser.email,
				name:  newUser.name,
				login: newUser.login,
			});	
		} else {
			res.status(400).json(GeneralResponses.SomethingWentWrong);
		}
	}	
}; 
export const login    = async (req: Request, res: Response) => {
	const result = await _findUsers(req.body.login, req.body.email);

	if (!result) { 
		res.status(404).json(UserResponseJson.userDontExist); 
	} else {
		const isPasswordCorrect = bcrypt.compareSync(
			req.body.password,
			result.passHash,
		);

		if (!isPasswordCorrect) {
			res.status(401).json(GeneralResponses.InvalidAuthData);
		} else {
			// const token = jwt.sign({ id: result.id }, process.env.JWT_PASSPHRASE);
			// const token = jwt.sign({ id: result.id }, 'testjwtkey');
			const payload: JwtPayload = { id: String(result.id) };
			const token = jwt.sign(payload, 'testjwtkey');
			const { passHash, ...other } = result;

			res.cookie(Cookies.AccessToken, token, {
		        sameSite: 'none',
		        secure: true
		    }).status(200).json(other);
		} 
	}
}; 
export const logout   = (req: Request, res: Response) => {
	res.clearCookie(Cookies.AccessToken, {
	    sameSite: 'none',
	    secure: true
	}).status(200).json(UserResponseJson.logoutSuccess);
}; 