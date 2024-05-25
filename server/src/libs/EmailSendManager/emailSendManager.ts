import nodemailer, { TestAccount, Transporter } from 'nodemailer';

export type EmailWorkMode = 'TEST' | 'PRODUCTION';


export class EmailSendManager {
	private _account?: TestAccount | null;
	private _transporter?: Transporter | null;
	private _mode: EmailWorkMode;

	constructor (mode: EmailWorkMode) { this._mode = mode };

	init = async (host: string, port: number, secureFlag: boolean) => {
		if (this._mode === 'TEST') {
			this._account = await nodemailer.createTestAccount();
		}

		this._transporter = nodemailer.createTransport({
			host: (this._mode === 'TEST') ? 'smtp.ethereal.email' : host,
			port: port, 
			secure: secureFlag,
			auth: {
				user: this._account?.user,
				pass: this._account?.pass,
			},
		});
	};

	sendMail = async (from: string, to: string, subject: string, text: string, html: string) => {
		return await this._transporter?.sendMail({
			from: from,
			to: to,
			subject: subject,
			text: text,
			html: html,
		});
	};
};
