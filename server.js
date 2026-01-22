// express framework
const express = require("express");
const app = express();
const mongodb = require("./database/database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, DELETE, OPTIONS, PUT",
	);
	next();
});

app.use("/", require("./routes"));
app.use("/users", require("./routes/contact"));

mongodb.initDb((err) => {
	if (err) {
		console.error("Database initialization failed:", err);
		console.warn(
			"Starting server without a database connection (development mode).",
		);
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	} else {
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	}
});
