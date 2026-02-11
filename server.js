// express framework
const express = require("express");
const app = express();
const mongodb = require("./database/database");
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
