import { VerifyErrors } from "jsonwebtoken";

export type JwtError = VerifyErrors | null;
export type JwtPayload = {
	id: string;
};