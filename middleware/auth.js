// middleware/auth.js
const passport = require("passport");

exports.authenticate = (req, res, next) => {
	if (req.session.user === undefined) {
		return res
			.status(401)
			.json({ message: "Access denied. No session provided." });
	}
	next();
};
