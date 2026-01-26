const validator = require("../helpers/validate");

const saveTemple = (req, res, next) => {
	const validationRule = {
		name: "required|string",
		temple_id: "required|numeric",
		location: "required|string",
		additionalInfo: "required|string",
		dedicated: "string",
	};
	validator(req.body, validationRule, {}, (err, status) => {
		if (!status) {
			res.status(412).send({
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
