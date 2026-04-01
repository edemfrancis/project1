// express framework
const express = require("express");
const app = express();
const mongodb = require("./database/database");
const mongodb2 = require("./database/database2");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GitHubstrategy = require("passport-github2").Strategy;
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

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

// app.use(cors, { methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] });
app.use(cors({ origin: "*" }));

app.use("/", require("./routes"));
app.use("/temples", require("./routes/temple"));
app.use("/contact", require("./routes/project1"))

passport.use(
	new GitHubstrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
		},
		(accessToken, refreshToken, profile, done) => {
			// User.findOrCreate({ githubId: profile.id }, function (err, user) => {
			done(null, profile);
			//});
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

process.on("uncaughtException", (err, origin) => {
	console.log(
		process.stderr.fd,
		`Caught exception: ${err}\n` + `Exception origin: ${origin}`,
	);
});

process.on("unhandledRejection", (reason, promise) => {
	console.log(
		process.stderr.fd,
		`Unhandled Rejection at: ${promise}, reason: ${reason}`,
	);
});

app.get("/", (req, res) => {
	res.send(
		req.session.user
			? `Hello, you logged in as ${req.session.user.username}!`
			: "Logged Out",
	);
});

app.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/api-docs",
		session: true,
	}),
	(req, res) => {
		req.session.user = req.user;
		res.redirect("/");
	},
);

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

mongodb.initDb((err) => {
	if (err) {
		console.error("Temples database initialization failed:", err);
		console.warn(
			"Starting server without Temples database connection (development mode).",
		);
		// Still try to initialize the second database
		mongodb2.initDb((err2) => {
			if (err2) {
				console.error("Project1 database initialization failed:", err2);
				console.warn("Starting server without database connections.");
			}
			app.listen(port, () => {
				console.log(`Server is running on http://localhost:${port}`);
			});
		});
	} else {
		// Initialize second database
		mongodb2.initDb((err2) => {
			if (err2) {
				console.error("Project1 database initialization failed:", err2);
				console.warn("Temples database connected, but project1 database failed.");
			}
			app.listen(port, () => {
				console.log(`Server is running on http://localhost:${port}`);
			});
		});
	}
});
