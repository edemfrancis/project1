const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Contact API",
		description: "API for managing contacts",
	},
	host: "localhost:3000",
	schemes: ["https", "http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js", "./routes/contact.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
