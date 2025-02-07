import { pool } from "../../config/database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function signup(req, res) {
	const { name, lastname, email, password } = req.body;

	// Validation for required properties
	if (!name || !lastname || !email || !password) {
		return res.status(400).json({ message: "All properties are required" });
	}

	try {
		// Check if the user already exists
		const findIfUserExists = `SELECT email FROM users WHERE email = ($1)`;
		const { rows } = await pool.query(findIfUserExists, [email]);
		const [user] = rows;

		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Hash the password
		const saltRounds = bcrypt.genSaltSync(10);
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create new user in the database
		const createUserQuery = `INSERT INTO users (role_id, name, lastname, email, password, created_at) 
                             VALUES ($1, $2, $3, $4, $5, NOW())`;

		await pool.query(createUserQuery, [1, name, lastname, email, hashedPassword]);

		return res.status(201).json({ message: "User created successfully" });

	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export async function signin(req, res) {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: "All properties are required" });
	}

	try {
		const findUserQuery = `SELECT email, password FROM users WHERE email = ($1)`
		const { rows } = await pool.query(findUserQuery, [email])
		const [user] = rows

		if (!user) {
			return res.status(404).json({ message: "user not found" })
		}

		const match = await bcrypt.compare(password, user.password)

		if (!match) {
			return res.status(401).json({ message: " incorrect password" })
		}

		const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
		return res.status(200).json({ message: "login succesful", token: token })

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "internal server error", error: error })
	}
};

