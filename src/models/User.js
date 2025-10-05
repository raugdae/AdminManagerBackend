import pool from "../config/database.js";

class User {
  static async userProfile(id) {
    console.log(id);
    const result = await pool.query(
      "SELECT firstname,lastname,street_name,street_number,zip,city FROM tperson WHERE id = $1",
      [id]
    );
    return result.rows[0];
  }

  static async attendedEvent(userid) {
    const result = await pool.query(
      `
            SELECT tevent.event_name,tgroup.group_name 
            FROM tattendee 
            LEFT JOIN tperson ON tperson.id =tattendee.fk_personid
            LEFT JOIN tgroup ON tgroup.id = tattendee.fk_groupid
            LEFT JOIN tevent ON tevent.id = tgroup.fk_eventid
            WHERE tperson.id = $1`,
      [userid]
    );
    return result.rows;
  }
}
export default User;
