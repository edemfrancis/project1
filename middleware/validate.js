const validator = require("../helpers/validate");

const saveTemple = (req, res, next) => {
	const validationRule = {
		name: "required|string",
		temple_id: "required|numeric",
		location: "required|string",
		dedicated: "string",
		additionalInfo: "boolean",
		username: "required|string",
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(400).send({
				success: false,
				message: "Validation failed",
				data: err,
			});
		} else {
			next();
		}
	});
};

module.exports = {
	saveTemple,
};
