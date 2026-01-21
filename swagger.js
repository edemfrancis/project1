const swaggwerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Contact API",
		description: "API for managing contacts",
	},
	host: "localhost:3000",
	schemes: ["http", "https"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js", "./controllers/project1.js"];

swaggwerAutogen(outputFile, endpointsFiles, doc);
