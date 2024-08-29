import { DOMAIN, EMAIL_DOMAIN, EMAIL_HOST, EMAIL_PASS, EMAIL_USER } from './constants';
import nodemailer from 'nodemailer';

export async function sendEmail({ token, email }: { token: string; email: string }) {
	try {
		const transport = nodemailer.createTransport({
			host: EMAIL_HOST,
			port: 2525,
			auth: {
				user: EMAIL_USER,
				pass: EMAIL_PASS,
			},
		});

		await transport.sendMail({
			from: {
				address: EMAIL_DOMAIN,
				name: 'Blazingdb',
			},
			to: [email],
			subject: 'Confirm account - Blazingdb',
			html: `
            <div>
                <h2>Confirm your account</h2>
                <p>
                    Thank you for signing up for Blazingdb. To confim your account, please follow the button below.
                </p>
                <a href='${DOMAIN}/verify?token=${token}'>Confirm account</a>
            </div>
            `,
		});
	} catch (error) {
		console.log(error);
	}
}
