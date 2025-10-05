import pool from '../config/database.js';

class Auth{
    static async registerUser(userData){
        const {email,pwd,role = 'user', fk_personid = null} = userData;

        const result = await pool.query(`
            INSERT INTO tuser (
            email,
            pwd,
            role,
            fk_personid,
            is_active)
            VALUES
            ($1,$2,$3,$4,$5,true)
            RETURNING id,email`,[email,pwd,role,fk_personid]);

            return result.rows[0];
    };
    static async emailExists(email){
        const result = await pool.query(`
            SELECT COUNT(*) as count
            FROM tuser
            WHERE email = $1`,[email]);

        return parseInt(result.rows[0].count) > 0;
    }
}