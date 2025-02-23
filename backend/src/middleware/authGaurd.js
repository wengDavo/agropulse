import jwt from 'jsonwebtoken';

export async function authGaurd(req, res, next) {
	// sent with cookies
	const token = req.cookies?.jwt_token;
	console.log("cookies", )

	// sent as a header
	// const authHeader = req.headers['authorization'];
	// const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(403).json({ message: "Token is required" });
	}

	try {
		const userDecoded = jwt.verify(token, process.env.TOKEN_SECRET);

		req.user = userDecoded;
		return next();

	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			return res.status(401).json({ message: "Token has expired" });
		}
		if (err.name === 'JsonWebTokenError') {
			return res.status(403).json({ message: "Forbidden, invalid token signature" });
		}
		return res.status(403).json({ message: "Forbidden, invalid token" });
	}
}

