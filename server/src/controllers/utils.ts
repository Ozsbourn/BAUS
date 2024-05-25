import { User } from "@prisma/client";
import { db } from "../db/db";

export const _findUsers = async (login: string, email: string) => {
	// TODO: update to find unique with OR (There is error on this way with unique)
	const user: User | null = await db.user.findFirst({
		where: {
			OR: [
				{ login: login, },
				{ email: email, },
			],
		}
	});

	return user;
};