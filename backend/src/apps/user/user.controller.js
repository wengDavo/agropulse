import { pool } from "../../config/database.js";

export async function getUsers(req, res) {
	const { email } = req.query;

	try {
		if (email) {
			// Fetch a specific user by email
			const getUserQuery = "SELECT email, name, lastname FROM users WHERE email = $1";
			const { rows } = await pool.query(getUserQuery, [email]);
			const [user] = rows;

			if (!user) {
				return res.status(404).json({ message: "User does not exist" });
			}

			return res.status(200).json({ message: "Successful", user });
		} else {
			// Fetch all users
			const getAllUsersQuery = "SELECT * FROM users";
			const queryResults = await pool.query(getAllUsersQuery);
			return res.status(200).json({ message: "Users fetched", data: queryResults.rows });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export async function patchUser(req, res) {
	const { name, lastname, email } = req.body;

	if (!name || !lastname || !email) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		const updateUserQuery = `
			UPDATE users 
			SET name = $1, lastname = $2 
			WHERE email = $3 
			RETURNING email, name, lastname
		`;

		const { rows } = await pool.query(updateUserQuery, [name, lastname, email]);

		if (rows.length === 0) {
			return res.status(404).json({ message: "User does not exist" });
		}

		return res.status(200).json({ message: "Successful", user: rows[0] });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export async function getChats(req, res) {
	const { email } = req.query;

	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	try {
		// Get user ID from email
		const getUserIdQuery = "SELECT id FROM users WHERE email = $1";
		const userRes = await pool.query(getUserIdQuery, [email]);

		if (userRes.rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		const userId = userRes.rows[0].id;

		// Get user's chats
		const getUserChatsQuery = "SELECT * FROM chats WHERE user_id = $1";
		const { rows: chats } = await pool.query(getUserChatsQuery, [userId]);

		return res.status(200).json({ message: "Chats fetched", chats });
	} catch (error) {
		console.error("Error fetching chats:", error);
		return res.status(500).json({ error: error.message });
	}
}

export async function createChat(req, res) {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	try {
		// Get user ID from email
		const getUserIdQuery = "SELECT id FROM users WHERE email = $1";
		const userRes = await pool.query(getUserIdQuery, [email]);

		if (userRes.rows.length === 0) {
			return res.status(404).json({ message: "User not found" });
		}

		const userId = userRes.rows[0].id;

		const createChatQuery = `
			INSERT INTO chats (user_id) 
			VALUES ($1) 
			RETURNING *;
		`;

		const { rows } = await pool.query(createChatQuery, [userId]);

		return res.status(201).json({ message: "Chat Created", chat: rows[0] });
	} catch (error) {
		console.error("Error fetching chats:", error);
		return res.status(500).json({ error: error.message });
	}
}

export async function createMessage(req, res) {
	const { chat_id, role_id, message } = req.body;

	if (!chat_id || !role_id || !message) {
		return res.status(400).json({ message: "All fields are required" });
	}

	try {
		// Insert the message and return the new record
		const createMessageQuery = `
			INSERT INTO messages (chat_id, role_id, message)
			VALUES ($1, $2, $3) RETURNING *;
		`;
		const { rows } = await pool.query(createMessageQuery, [chat_id, role_id, message]);

		return res.status(201).json({ message: "Message Created", chat: rows[0] });
	} catch (error) {
		console.error("Error inserting message:", error);
		return res.status(500).json({ error: error.message });
	}
}

export async function getMessages(req, res) {
	const { chatId } = req.query;

	if (!chatId) {
		return res.status(400).json({ message: "Chat ID is required" });
	}

	try {
		// Fetch all messages for a given chat session
		const getMessagesQuery = "SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC";
		const { rows: messages } = await pool.query(getMessagesQuery, [chatId]);

		if (messages.length === 0) {
			return res.status(404).json({ message: "No messages found for this chat" });
		}

		return res.status(200).json({ message: "Successful", messages });
	} catch (error) {
		console.error("Error fetching messages:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

