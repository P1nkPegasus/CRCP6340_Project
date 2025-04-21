import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

let pool;

export async function connect() {
  let cString =
    "mysql://" +
    process.env.MYSQL_USER +
    ":" +
    process.env.MYSQL_PASSWORD +
    "@" +
    process.env.MYSQL_HOST +
    ":" +
    process.env.MYSQL_PORT +
    "/" +
    process.env.MYSQL_DATABASE +
    "?" + process.env.MYSQL_SSL;
    pool = mysql
    .createPool({
      // cString
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      ssl: {
        ca: fs.readFileSync(
          "/Users/rookmac/Documents/School/SMU/CRCP_6340_Creative_Coding_App_Dev/CRCP6340_Project/ca-certificate.crt"
        ), 
        rejectUnauthorized: true, // Enforces SSL certificate validation
      },
    })
    .promise();
}

export async function getAllProjects() {
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}
