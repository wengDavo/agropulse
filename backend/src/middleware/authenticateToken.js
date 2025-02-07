import jwt from 'jsonwebtoken';

export async function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	// If no token is provided, return a 401 response
	if (!token) {
		return res.status(401).json({ message: "Token is required" });
	}

	try {
		// Verifying the token's validity and expiration (using your TOKEN_SECRET)
		const userDecoded = jwt.verify(token, process.env.TOKEN_SECRET);

		req.user = userDecoded;
		next();

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

