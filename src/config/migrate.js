import { Umzug } from "umzug";
import { client } from "./database.js";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationsPath = path.resolve(__dirname, '../migrations');

const migrator = new Umzug({
	migrations: {
		// search all folders under migrations folder for the up.sql pattern
		// if we search for the pattern `.sql` it searches twice as needed for a folder, because of `down.sql`
		glob: path.join(migrationsPath, "**/up.sql"),
		resolve(params) {
			// Extract the migration folder path
			const migrationFolder = path.dirname(params.path);

			// Construct the paths to `up.sql` and `down.sql`
			const upPath = path.join(migrationFolder, 'up.sql');
			const downPath = path.join(migrationFolder, 'down.sql');

			console.log('Migration folder:', migrationFolder);
			console.log('Up path:', upPath);
			console.log('Down path:', downPath);

			const migrationName = path.basename(migrationFolder);

			return {
				name: migrationName,
				path: params.path,
				up: async () => params.context.query(fs.readFileSync(upPath).toString()),
				down: async () => params.context.query(fs.readFileSync(downPath).toString()),
			};
		},
	},
	context: client,
	logger: console,

	// storage: 'umzug-storage-pg', // Use PostgreSQL storage
	// storageOptions: {
	//	tableName: 'migrations', // Name of the table to store migration history
	//	schemaName: 'public', // Schema name (optional)
	//	connection: client, // Pass the connection pool
	// },
});


// Run migrations
(async () => {
	try {
		await client.connect();
		const args = process.argv.slice(2); // first two arguments are node and the script
		const migrations = args[0] === "--rollback" ? await migrator.down()
			: await migrator.up();
		console.log('Migrations applied:', migrations);
	} catch (err) {
		console.error('Error running migrations:', err);
	} finally {
		await client.end();
	}
})();
