/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({
    path: path.join(__dirname, '../.env.local'),
});

const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: {
        rejectUnauthorized: false,
    },
});

const migrationDir = path.join(__dirname, 'migrations');

const runMigration = async (fileName) => {
    const filePath = path.join(migrationDir, fileName);

    if (!fs.existsSync(filePath)) {
        console.error(`Migration file ${fileName} does not exist.`);
        process.exit(1);
    }

    const query = fs.readFileSync(filePath, 'utf8');

    try {
        await client.connect();
        await client.query(query);
        console.log(`Migration ${fileName} executed successfully.`);
    } catch (error) {
        console.error(`Error executing migration ${fileName}:`, error);
    } finally {
        await client.end();
    }
};

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: yarn run migration <migration-file>');
    process.exit(1);
}

const [fileName] = args;
runMigration(fileName);
