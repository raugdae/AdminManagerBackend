import pool from '../config/database.js';

class Auth{
    static async registerUser(userData){
        const {email,pwd,role} = userData;

        const result = await pool.query(`
            INSERT INTO tuser (
            email,
            pwd,
            role,
            is_active)
            VALUES
            ($1,$2,$3,$4)
            RETURNING id,email`,[email,pwd,role,true]);

            return result.rows[0];
    };
    static async emailExists(email){
        const result = await pool.query(`
            SELECT COUNT(*) as count
            FROM tuser
            WHERE email = $1`,[email]);

        return parseInt(result.rows[0].count) > 0;
    };

    static async findByEmail(email){
        const result = await pool.query(`
            SELECT id, email, pwd, role, is_active,fk_personid
            FROM tuser
            WHERE email = $1`,[email]);

        return result.rows[0] || 0;
    }

    static async updateLastLogin(email){
        const result = await pool.query(`
            update tuser SET last_login = NOW() WHERE email = $1;`,[email]);
        return true;
    }
}

export default Auth;