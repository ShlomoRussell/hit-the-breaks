import { createPool } from "mysql";
import { promisify } from "util";

const pool = createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "hit_the_breaks",
  debug: false,
});

const queryAsync = promisify(pool.query).bind(pool);

export default async function runQuery(sql, params) {
  return queryAsync(sql, params);
}
