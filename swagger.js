const swaggerAutogen = require("swagger-autogen")();

const doc = {
	info: {
		title: "Temples API",
		description: "API for managing temples data",
	},
	host: "localhost:3000",
	schemes: ["https", "http"],
};
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js", "./routes/temple.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
