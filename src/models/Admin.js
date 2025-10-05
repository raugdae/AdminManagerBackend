import pool from '../config/database.js';

class Admin {

    //GETTER
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

        static async getAttendeeByGroup(eventid,groupid){
        const result = await pool.query(`
            SELECT tperson.lastname,tperson.firstname FROM tattendee
            LEFT JOIN tperson ON tattendee.fk_personid = tperson.id
            INNER JOIN tattendee_tgroup ON tattendee.id = tattendee_tgroup.fk_attendeeid
            RIGHT JOIN tgroup ON tattendee_tgroup.fk_groupid = tgroup.id
            LEFT JOIN tevent ON tgroup.fk_eventid = tevent.id
            WHERE tevent.id = $1 AND tgroup.id = $2`,[eventid,groupid]);

            return result.rows;
    };

    static async getAllPerson(){
        const result = await pool.query(`
            SELECT firstname,lastname,email FROM tperson WHERE is_active = true`);
        return result.rows;
    };
    static async getPerson(firstname,lastname){
        const result = await pool.query(`
            SELECT firstname,lastname FROM tperson WHERE firstname = $1 AND lastname = $2`,[firstname,lastname]);
        return result.rows[0];

    };

    static async getAllergenList(){
        const result = await pool.query(`
            SELECT * FROM tallergen`);
        return result.rows;

    };

    static async getPersonAllergen(personid){
        const result = await pool.query(`
            SELECT tperson.firstname,tperson.lastname,array_agg(tallergen.allergen_name) AS allergens
            FROM tperson_tallergen
            LEFT JOIN tperson ON tperson.id = tperson_tallergen.fk_personid
            LEFT JOIN tallergen ON tallergen.id = tperson_tallergen.fk_allergenid
            GROUP BY tperson.firstname,tperson.lastname`);
        return result.rows;
    };


    //END GETTERS
    //ADDERS

    static async addNewGroup(groupname,eventid){
        const result = await pool.query(`
            INSERT INTO tgroup (group_name,fk_eventid) VALUES ($1,$2)`,[groupname,eventid]);
            return result;
    };
    static async addNewChildGroup(eventid,parentgroupid,groupname){
        const result = await pool.query(`
            INSERT INTO tgroup (group_name,fk_parentgroupid,fk_eventid) VALUES ($1, $2, $3)`,[groupname,parentgroupid,eventid]);
        return result;

    };

    static async addNewEvent(eventData){
        const result = await pool.query(`
            INSERT INTO tevent (event_name,start_date,end_date,street_name,street_number,zip,city,active) VALUES ($1,$2,$3,$4,$5,$6,$7,true) RETURNING id,event_name`,[eventData.eventName,eventData.startDate,eventData.endDate,eventData.streetName,eventData.streetNumber,eventData.zip,eventData.city]);
            return result;
    };
    
    static async addAttendeeToGroup(data){
        try{

        const result = await pool.query(`
            INSERT INTO tattendee_tgroup (fk_attendeeid,fk_groupid) VALUES ($1,$2) RETURNING 1`,[data.attendeeid,data.groupid]);

        return result.rows[0];
        }
        catch (error) {
            if (error.code === '23505'){
                return {success:'false',error:'DUPLICATE_ENTRY',message:'User already in group'};
            }
            throw error;
        }
    };

    static async addPerson(data){
        const result = await pool.query(`
            INSERT INTO tperson (
            firstname,
            lastname,
            emergency_contact_name,
            emergency_contact_description,
            emergency_contact_number,
            city,
            zip,
            street_name,
            street_number,
            email,
            health_condition,
            birthdate,
            isvegetarian) VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
            RETURNING firstname,lastname,id`,[
                data.firstName,
                data.lastName,
                data.iceName,
                data.iceDescription,
                data.iceNumber,
                data.city,
                data.zip,
                data.strtName,
                data.strtNr,
                data.email,
                data.health,
                data.birthdate,
                data.isVegetarian]
                );


            return result.rows[0];
    };


    static async addAllergenToPerson(personid,allergenid){
        try{
            const listAllergen = await pool.query(`
                INSERT INTO tperson_tallergen 
                (fk_personid,
                fk_allergenid) VALUES ($1,$2) RETURNING *`,[personid,allergenid]);

            return listAllergen.rows;
        }
        catch (error){
            if(error.code === '23505'){
                return {success:false,error:'DUPLICATE_ENTRY',message:"L'allergen à déjà été assigné à l'utilisateur"};
            }
            throw error;
        }
    }; 
    

    //UPDATERS

    static async updatePersonData(personid,data){
        const result = await pool.query(`
            UPDATE tperson SET firstname=$1,
            lastname=$2,
            emergency_contact_name =$3,
            emergency_contact_description =$4,
            emergency_contact_number=$5,
            city=$6,
            zip=$7,
            street_name=$8,
            street_number=$9,
            email=$10,
            health_condition=$11,
            birthdate=$12,
            isvegetarian=$13
            WHERE id = $14 RETURNING 1`,[
                data.firstName,
                data.lastName,
                data.iceName,
                data.iceDescription,
                data.iceNumber,
                data.city,
                data.zip,
                data.strtName,
                data.strtNr,
                data.email,
                data.health,
                data.birthdate,
                data.isVegetarian,
                personid]);


            return result;
        };
  

        //DELETERS





    }
export default Admin;