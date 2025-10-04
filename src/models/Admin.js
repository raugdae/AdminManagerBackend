import pool from '../config/database.js';

class Admin {

    static async getAllEvents(){
        const result = await pool.query('SELECT * FROM tevent');
        return result.rows;
    };

    static async getActiveEvents(){
        const result = await pool.query('SELECT * FROM tevent WHERE active = true');
        return result.rows;
    };

    static async getAllAttendeeFromEvent(eventid){
        const result = await pool.query(`SELECT tperson.firstname,tperson.lastname,tgroup.group_name FROM tattendee 
                                            LEFT JOIN tperson ON tattendee.fk_personid = tperson.id
                                            LEFT JOIN tgroup ON tattendee.fk_groupid = tgroup.id
                                            LEFT JOIN tevent ON tgroup.fk_eventid = tevent.id 
                                            WHERE tevent.id = $1`,[eventid]);

        return result.rows;
    };
    static async getCountOfAttendee(eventid){
        const result = await pool.query(`
            Select count(tattendee.id) as total, tgroup.group_name, tevent.event_name 
            FROM tattendee
            LEFT JOIN tgroup ON tattendee.fk_groupid = tgroup.id
            INNER JOIN tgroup parent ON tgroup.fk_parentgroupid = parent.id
			LEFT JOIN tevent on tgroup.fk_eventid = tevent.id
            WHERE tevent.id = $1
            GROUP BY tgroup.group_name,tevent.event_name`,[eventid]);
    
        return result.rows;
    };

    static async addNewGroup(groupname,eventid){
        const result = await pool.query(`
            INSERT INTO tgroup (group_name,fk_eventid) VALUES ($1,$2)`,[groupname,eventid]);
            return result;
    }
    static async addNewChildGroup(eventid,parentgroupid,groupname){
        const result = await pool.query(`
            INSERT INTO tgroup (group_name,fk_parentgroupid,fk_eventid) VALUES ($1, $2, $3)`,[groupname,parentgroupid,eventid]);
        return result;

    }
    
    
}

export default Admin;