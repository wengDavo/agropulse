import { pool } from "../../config/database.js"

export async function getUsers(req, res, next) {
	try {
		const getAllUsersQuery = `SELECT * FROM users`
		const queryResults = await pool.query(getAllUsersQuery)
		return res.status(200).json({ message: "user created", data: queryResults.rows })
	} catch (error) {
		return res.status(500).json({ error: error })
	}
}


