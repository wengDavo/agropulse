import { Umzug } from "umzug";
import { client } from "./database.js";
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import fs from "fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationsPath = path.resolve(__dirname, '../migrations');
const seedsPath = path.resolve(__dirname, '../seeds');

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

const seeder = new Umzug({
	migrations: {
		glob: path.join(seedsPath, '**/up.sql'),
		resolve(params) {
			const seedFolder = path.dirname(params.path);
			const upPath = path.join(seedFolder, 'up.sql');

			const seedName = path.basename(seedFolder);

			return {
				name: seedName,
				path: params.path,
				up: async () => params.context.query(fs.readFileSync(upPath).toString()),
			};
		},
	},
	context: client,
	logger: console,
});


// Run migrations
(async () => {
	try {
		await client.connect();
		// first two arguments are node and the script

		const args = process.argv.slice(2);

		if (args[0] == "--seed") {
			const seeds = await seeder.up();
			console.log('Seeds applied:', seeds);
			return;
		}
		// note that the rollback only rollsback the most recent migration
		if (args[0] == "--rollback") {
			const migrations = await migrator.down();
			console.log('Migrations rolled back:', migrations);
			return;
		}

		// default apply migrations
		let migrations = await migrator.up();
		console.log('Migrations applied:', migrations);
	} catch (err) {
		console.error('Error running migrations:', err);
	} finally {
		await client.end();
	}
})();
