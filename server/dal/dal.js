import { createPool } from "mysql";
import { promisify } from "util";
import { config } from "dotenv";
config()
const pool = createPool({
  connectionLimit: 100, //important
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD||"",
  database: process.env.DATABASE_NAME,
  debug: false,
});

const queryAsync = promisify(pool.query).bind(pool);

export default async function runQuery(sql, params) {
  return queryAsync(sql, params);
}
