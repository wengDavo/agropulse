import pg from 'pg'
const { Pool } = pg
const { Client } = pg

// Create a connection pool
const databaseConfig = {
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD || "postgres",
	port: parseInt(process.env.DB_PORT || '5432'),
};

// Create a connection pool and client
export const pool = new Pool(databaseConfig);
export const client = new Client(databaseConfig);

// Test the connection
export function testDbConnection() {
	pool.query('SELECT NOW()', (err, res) => {
		if (err) {
			console.error('Error connecting to the database:', err);
		} else {
			console.log('Database connection successful:', res.rows[0]);
		}
	});
}
