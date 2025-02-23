// dependencies
import express from "express"
import helmet from "helmet"
import { rateLimit } from 'express-rate-limit'
import morgan from "morgan"
import 'dotenv/config'
import cors from 'cors'
import cookieParser from "cookie-parser"

// configurations
import { testDbConnection } from "./config/database.js"
import { authGaurd } from "./middleware/authGaurd.js"

// routes
import userRouter from "./apps/user/user.routes.js"
import authRouter from "./apps/auth/auth.routes.js"
import aiRouter from "./apps/ai/ai.routes.js"

const app = express()
const SERVER_PORT = process.env.SERVER_PORT || 8080
testDbConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet());
app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
		standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	})
)
app.use(cors({
	origin: process.env.CORS_ORIGIN || [
		"http://localhost:5173",
	],
	credentials: true, // Allows sending credentials
}))
app.use(morgan('dev'))

// routes
app.get("/", function(req, res) {
	res.status(200).json({
		message: "The server is up and running"
	})
})
app.get("/test", authGaurd, function(req, res) {
	res.status(200).json({
		message: "you made it"
	})
})
app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/ai", aiRouter)

// error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

// start server
app.listen(SERVER_PORT, function() {
	console.log(`Sever is listening at http://localhost${SERVER_PORT}`)
})

// testing
export default app;
