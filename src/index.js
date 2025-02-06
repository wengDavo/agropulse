import express from "express"
import helmet from "helmet"
import { rateLimit } from 'express-rate-limit'
import morgan from "morgan"
import 'dotenv/config'
import cors from 'cors'
import { testDbConnection } from "./config/database.js"

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 8080
testDbConnection()

app.use(helmet());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
		standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	})
)
app.use(cors())
app.use(morgan('dev'))

// routes
app.get("/", function(req, res) {
	res.send("The server is up and running")
})

// error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

// start server
app.listen(SERVER_PORT, function() {
	console.log(`Sever is listening at http://localhost${SERVER_PORT}`)
})


