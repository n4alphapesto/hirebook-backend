const nodemailer = require("nodemailer");
const { CONFIG } = require("./config");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: CONFIG.EMAIL_SMTP_HOST,
	port: CONFIG.EMAIL_SMTP_PORT,
	secure: CONFIG.EMAIL_SMTP_SECURE, // lack of ssl commented this. You can uncomment it.
	auth: {
		user: CONFIG.EMAIL_SMTP_USERNAME,
		pass: CONFIG.EMAIL_SMTP_PASSWORD
	}
});

exports.send = function (from, to, subject, html) {
	// send mail with defined transport object
	// visit https://nodemailer.com/ for more options
	return transporter.sendMail({
		from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
		to: to, // list of receivers e.g. bar@example.com, baz@example.com
		subject: subject, // Subject line e.g. 'Hello ✔'
		//text: text, // plain text body e.g. Hello world?
		html: html // html body e.g. '<b>Hello world?</b>'
	});
};