const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Temples and Contact API",
		description: "API for managing temples data and contact data",
	},
	host: "localhost:3000",
	schemes: ["https", "http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js", "./routes/temple.js", "./routes/project1.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
