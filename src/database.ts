import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

let Client = new Pool();

if (ENV == 'dev') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
} else if (ENV == 'test') {
    Client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        port: parseInt(POSTGRES_TEST_PORT as string), // for testing on different postgres container
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default Client;