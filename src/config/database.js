import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

console.log(process.env.DB_PASSWORD);

pool.connect((err, client, release) =>{
    if (err){
        console.error('Connection error on database :', err.message);

    }else{
        console.log('Connection sucessful on database');
        release();
    }
});

export default pool;