// express framework
const express = require("express");
const app = express();
const mongodb = require("./database/database");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());

app.use("/", require("./routes/"));
app.use("/users", require("./routes/contact"));

const port = process.env.PORT || 8080;

mongodb.initDb((err) => {
	if (err) {
		console.error("Database initialization failed:", err);
		console.warn(
			"Starting server without a database connection (development mode)."
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
