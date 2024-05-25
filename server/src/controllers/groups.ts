import { Request, Response } from "express";
import { db } from "../db/db";
import jwt    from "jsonwebtoken";
import { Group, GroupStatus, Invitation, Post, UserRoleInGroup } from "@prisma/client";
import { NullableGroup } from "../libs/types/PrismaDtoGenerics";
import { GeneralResponses } from "../configs/responseJson/generalResponses";
import { GroupsResponses } from "../configs/responseJson/groupsResponses";
import { GroupsPlaceholders } from "../configs/placeholders/groupPlaceholders";
import { JwtError } from "../libs/types/jwtTypes";
import { findExpiringDate } from "../libs/utils/DateAndTimeUtilization/findExpiringTimestamp";


export const getGroups = async (req: Request, res: Response) => {
	try {
		const neededUserId = Number(req.query.userId);

		const groups = await db.usersOnGroups.findMany({ 
			select: {
				userId:  true,
				userRole: true,
				group: {
					select: {
						id: true,
						name: true,
						urlName: true,
						status: true,
						avatarUrl: true,
					}
				}
			},
			where: {
				userId: neededUserId,
			},
		});

		if (groups) {
			res.status(200).json(groups);
		} else {
			return res.status(404).json(GroupsResponses.GroupsDoesntExist);
		}
	} catch (ex) {
		return res.status(400).json(GeneralResponses.BadParameters);
	} 
};
export const getGroup = async (req: Request, res: Response) => {
	try {
		const group: NullableGroup = await db.group.findUnique({
			where: {
				urlName: req.params.urlName,
			},
		});

		if (group) {
			res.status(200).json(group);
		} else {
			res.status(404).json(GroupsResponses.GroupDoesntExist);
		}
	} catch (ex) {
		res.status(500).json(GeneralResponses.InternalServerError);
	}
};
export const createGroup = (req: Request, res: Response) => {
	try {
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json(GeneralResponses.Unauthorized);
		} else {
			// TODO: env point to JWT
			jwt.verify(token, 'testjwtkey',  async (err: JwtError, decodedPayload: any) => { 
				if (err) {
					console.log(err);
					return res.status(403).json(GeneralResponses.InvalidAuthToken);
				}

				// [DEBUG]: change it to correct uuid fix this thing
				// [TODO]: is this thing really needed?
				const userId = String(req.body.userId);
				if (userId !== decodedPayload.id) {
					console.log(decodedPayload);
					return res.status(403).json(GeneralResponses.DontHavePermissions);
				}

				const newGroup: Group = await db.group.create({
					data: {
						name: req.body.name,
						urlName: req.body.urlName,
						description: req.body.description,

						avatarUrl: GroupsPlaceholders.AvatarPlaceholder,
						bannerUrl: GroupsPlaceholders.BannerPlaceholder,

						status: GroupStatus.ACTIVE,

						users: {
							create: [
								{
									userId: req.body.userId,
									userRole: UserRoleInGroup.OWNER,
								}
							],
						},
					}, 
				});

				if (newGroup) {
					return res.status(200).json(GroupsResponses.SuccesfullyCreated);	
				} else {
					return res.status(400).json(GeneralResponses.SomethingWentWrong);
				}
			});
		}
	} catch(ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);
	} 
};
export const deleteGroup = (req: Request, res: Response) => {
	try {
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json(GeneralResponses.Unauthorized);
		} else {
			// TODO: env point to JWT
			jwt.verify(token, 'testjwtkey',  async (err: JwtError, decodedPayload: any) => {
				if (err) {
					return res.status(403).json(GeneralResponses.InvalidAuthToken);
				}
				
				const deletedGroup: Group = await db.group.update({
					where: {
						id: Number(req.params.id),
					},
					data: {
						status: GroupStatus.DELETED,
					}, 
				});

				if (deletedGroup) {
					return res.status(200).json(GroupsResponses.SuccesfullyDeleted);	
				} else {
					return res.status(400).json(GeneralResponses.SomethingWentWrong);
				}
			});
		}
	} catch (ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);
	}
};
export const editGroup = (req: Request, res: Response) => {};


export const getUserPermissions = async (req: Request, res: Response) => {
	try {
		const permissions = await db.usersOnGroups.findFirst({
			select: {
				userRole: true,
			},
			where: {
				user: {
					login: req.body.userLogin,
				},
				group: {
					urlName: req.body.groupUrlName,
				},
			},
		});

		if (permissions) {
			return res.status(200).json(permissions);
		} else {
			return res.status(400).json(GeneralResponses.SomethingWentWrong);
		}
	} catch (ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);
	};
};


export const getAllPosts = async (req: Request, res: Response) => {
	try {
		const posts: Post[] = await db.post.findMany({
			where: {
				group: {
					urlName: req.params.urlName,
				}
			}
		});

		if (posts) {
			const result = (posts) ? posts : [];
			return res.status(200).json(result);
		} else {
			return res.status(400).json(GeneralResponses.SomethingWentWrong);
		}
	} catch (ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);
	}
};
export const savePost = async (req: Request, res: Response) => {
	try {
		const post: Post = await db.post.create({
			data: {
				label: (req.body.label) ? req.body.label : null,
				text: req.body.text,
				groupId: req.body.groupId,
			},
		});

		if (post) {
			return res.status(200).json(GeneralResponses.Success);
		} else {
			return res.status(400).json(GeneralResponses.SomethingWentWrong);
		}
	} catch (ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);
	} 
};


export const createInvitation = async (req: Request, res: Response) => {
	try {
		const token = req.cookies.access_token;
		if (!token) { 
			return res.status(401).json(GeneralResponses.Unauthorized);
		} else {
			// TODO: env point to JWT
			jwt.verify(token, 'testjwtkey',  async (err: JwtError, decodedPayload: any) => {
				if (err) {
					return res.status(403).json(GeneralResponses.InvalidAuthToken);
				}

				const createdAt: Date = new Date();
				const invitation: Invitation = await db.invitation.create({
					data: {
						email: req.body.email,
						role: req.body.role,
						createdAt: createdAt,
						expires: findExpiringDate(createdAt.toString(), req.body.expired),
						groupId: req.body.groupId,
					}, 
				});

				if (invitation) {
					return res.status(200).json(GroupsResponses.InviteWasSent);	
				} else {
					return res.status(400).json(GeneralResponses.SomethingWentWrong);
				}
			});
		}
	} catch (ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);
	};
};
export const inviteOnGroupByUrl = async (req: Request, res: Response) => {
	try {

		// TODO: Send email was removed, return it later

		return res.status(200).json(GeneralResponses.Success);
	} catch (ex) {
		return res.status(500).json(GeneralResponses.InternalServerError);		
	}; 
};
export const acceptInvite = async (req: Request, res: Response) => {
	return res.status(200).json(GeneralResponses.Success);
};