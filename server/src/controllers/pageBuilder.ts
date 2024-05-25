import { Request, Response } from "express";
import { LandingPage } from "@prisma/client";
import { db } from "../db/db";
import jwt    from "jsonwebtoken";
import { GeneralResponses } from "../configs/responseJson/generalResponses";
import { LandingPageResponses } from "../configs/responseJson/landingPageResponses";

export const save = async (req: Request, res: Response) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.status(401).json(GeneralResponses.Unauthorized);
	} else {
		// TODO: env point to JWT
		jwt.verify(token, 'testjwtkey',  async (err: any, decodedPayload: any) => { // TODO: replace any types
			if (err) {
				return res.status(403).json(GeneralResponses.InvalidAuthToken);
			}

			const newLandPage: LandingPage = await db.landingPage.create({
				data: {
					name: req.body.name,
					content: req.body.data,

					isDraft: req.body.isDraft,
					groupId:  req.body.groupId,
				},
			});

			if (newLandPage) {
				console.log(newLandPage);
				res.status(200).json(LandingPageResponses.SuccesfulySaved);	
			} else {
				res.status(400).json(GeneralResponses.SomethingWentWrong);
			}
		});
	}
};
export const getPage = async (req: any, res: any) => {
	/* TODO: we can refactor it to one request, need a change db structure tho */
	try {
		const urlName = req.query.urlName;

		const group = await db.group.findUnique({
			where: {
				urlName: urlName,
			}
		});
		if (group) {
			const response = await db.landingPage.findUnique({
				where: {
					groupId: group.id,
				},
			});
			if (!response) {
				res.status(404).json(LandingPageResponses.NotFound);
			} else {
				res.status(200).json({
					name: response.name,
					content: response.content,
					updatedAt: response.updatedAt,
					isDraft: response.isDraft,
					groupId: response.groupId,
				});
			}
		} else {
			res.status(400).json(GeneralResponses.BadParameters);
		}
	} catch (ex) {
		res.status(400).json(GeneralResponses.BadParameters);
	}
};