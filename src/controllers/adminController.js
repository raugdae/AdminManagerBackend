import Admin from "../models/Admin.js";
import dotenv from "dotenv";

// GETTERS
export const getAllEvents = async (req, res) => {
  const listEvent = await Admin.getAllEvents();
  res.json({ success: true, count: listEvent.length, data: listEvent });
};

export const getAllAttendeeFromEvent = async (req, res) => {
  const eventid = req.params.eventid;
  const data = await Admin.getAllAttendeeFromEvent(eventid);
  res.json({ success: true, data });
};

export const getCountOfAttendee = async (req, res) => {
  const eventid = req.params.eventid;
  const attendeeCount = await Admin.getCountOfAttendee(eventid);
  res.json({ success: true, data: attendeeCount });
};

export const getAttendeeByGroup = async (req, res) => {
  const eventid = req.params.eventid;
  const groupid = req.params.groupid;

  const attendeeList = await Admin.getAttendeeByGroup(eventid, groupid);
  res.json({ success: true, attendeeList });
};

export const getAllPerson = async (req, res) => {
  const personlist = await Admin.getAllPerson();
  res.json({ success: true, personlist });
};

export const getPersonDetail = async (req, res) => {
  const personid = req.params.personid;
  const persondetail = await Admin.getPersonDetail(personid);
  res.json({ success: true, persondetail });
};

export const getAllergenList = async (req, res) => {
  const allergenList = await Admin.getAllergenList();
  const data = allergenList.map((item) => ({
    id: item.id,
    value: item.allergen_name,
  }));

  res.json({ success: true, data });
};

export const getPersonAllergens = async (req, res) => {
  const personid = req.params.personid;
  const personAllergenList = await Admin.getPersonAllergen(personid);
  res.json({
    success: true,
    counter: personAllergenList.count,
    personAllergenList,
  });
};

export const getAllUsers = async (req, res) => {
  const userList = await Admin.getAllUsers();

  res.json({ success: true, userList });
};

export const getEventData = async (req, res) => {
  const eventid = req.params.eventid;

  const data = await Admin.getEventData(eventid);

  res.json({ success: true, data });
};

export const getEventGroups = async (req, res) => {
  const eventid = req.params.eventid;

  const data = await Admin.getEventGroups(eventid);

  res.json({ success: true, data });
};

export const getAttendeeGroups = async (req, res) => {
  const eventid = req.params.eventid;
  const attendeeid = req.params.attendeeid;

  const data = await Admin.getAttendeeGroups(eventid, attendeeid);

  res.json({ success: true, data });
};

// END GETTERS
// ADDERS
export const addNewGroup = async (req, res) => {
  const eventid = req.params.eventid;
  const groupname = req.body.groupname;
  const parentid = req.body.parentid;
  const newgroupid = await Admin.addNewGroup(eventid, groupname, parentid);
  res.json({ success: true, message: "group added" });
};

export const addNewChildGroup = async (req, res) => {
  const childGroupData = req.body;
  const eventid = req.params.eventid;
  const newgroupid = await Admin.addNewChildGroup(
    eventid,
    childGroupData.parentgroupid,
    childGroupData.groupname
  );
  res.json({ success: true, message: "New child group added" });
};

export const newEvent = async (req, res) => {
  const eventData = req.body;

  const eventCreated = await Admin.addNewEvent(eventData);
  res.json({ success: true, eventCreated });
};

export const addAttendeeToGroup = async (req, res) => {
  const data = req.body;
  const userAdded = await Admin.addAttendeeToGroup(data);

  if (userAdded.success === "false") {
    console.log("Insert failed");
    if (userAdded.error == "DUPLICATE_ENTRY") {
      res.json({ success: false, messsage: "User already in group" });
    } else {
      res.json({ success: false, message: "Faild to add link" });
    }
  } else {
    res.json({ success: true, message: "Attendee added to group" });
  }
};

export const addEventAttendee = async (req, res) => {
  const data = req.body;

  const response = await Admin.addEventAttendee(data);
  res.json(response);
};

export const addPerson = async (req, res) => {
  console.log(req.body);

  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    emergency_contact_name: req.body.emergency_contact_name,
    emergency_contact_description: req.body.emergency_contact_description,
    emergency_contact_number: req.body.emergency_contact_number,
    city: req.body.city,
    zip: req.body.zip,
    street_name: req.body.street_name,
    street_number: req.body.street_number,
    email: req.body.email,
    health_condition: req.body.health_condition,
    birthdate: req.body.birthdate,
    isvegetarian: req.body.isvegetarian,
  };

  const personExists = await Admin.getPerson(data.firstname, data.lastname);

  console.log(personExists);

  if (personExists) {
    res.json({
      success: false,
      message: "A person with this firstname and lastname already exist",
    });
  } else {
    const addedPerson = await Admin.addPerson(data);
    res.json({ success: true, message: "User Added", addedPerson });
  }
};

export const addAllergenToPerson = async (req, res) => {
  const allergens = req.body.allergen;
  const personid = req.params.personid;

  if(personid){const results = await Promise.all(
    allergens.map((allergenid) =>
      Admin.addAllergenToPerson(personid, allergenid)
    )
  );

  if (results.success === "false") {
    if (results.error === "DUPLICATE_ENTRY") {
      res.json({ success: false, message: "At least one entry already exist" });
    }
  }
  res.json({ success: true, message: "Allergen registred", results });
}
else{
  res.json({success: false,message:"Missing personUUID"});
}
};
//END ADDERS

//PUTTERS
export const updatePersonData = async (req, res) => {
  console.log("receieved data:", req.body);

  const data = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    iceName: req.body.emergency_contact_name,
    iceDescription: req.body.emergency_contact_description,
    iceNumber: req.body.emergency_contact_number,
    city: req.body.city,
    zip: req.body.zip,
    strtName: req.body.street_name,
    strtNr: req.body.street_number,
    email: req.body.email,
    health: req.body.health_condition,
    birthdate: req.body.birthdate,
    isVegetarian: req.body.isvegetarian,
  };

  console.log(data);
  const personid = req.params.personid;
  const updatedPerson = await Admin.updatePersonData(personid, data);
  res.json({ success: true, message: "user edited successfully" });
};

export const updatePersonAllergen = async (req, res) => {
  const personid = req.params.personid | null;
  const submittedAllergens = req.body.allergenlist;
  console.log('personid',personid);
  if (personid){

  const currentData = await Admin.getPersonAllergen(personid);
  const currentAllergensID = currentData.map((row) => row.id);

  for (const allergen of submittedAllergens) {
    if (!currentAllergensID.includes(allergen.id)) {
      await Admin.addAllergenToPerson(personid, allergen.id);
    }
  }

  const submittedIDs = submittedAllergens.map((a) => a.id);
  for (const currentId of currentAllergensID) {
    if (!submittedIDs.includes(currentId)) {
      await Admin.deletePersonAlergen(personid, currentId);
    }
  }

  res.json({ status: true, message: "Allergen list updated" });
  }
  else{
    res.json({status: false,message:"person UUID is missing"});
  }
};

export const updateInfomaniakTicketing = async (req, res) => {
  const eventid = req.params.eventid;
  const infomaniakOrderNumber = req.body.ordernumber;
  const infomaniakToken = req.body.apikey;

  const responseInfomaniak = await fetch(
    `https://etickets.infomaniak.com/api/shop/order/${infomaniakOrderNumber}/tickets`,
    { method: "GET", headers: { key: infomaniakToken } }
  );
  const responseDB = await Admin.getAllTickets(eventid);

  console.log(responseDB);

  const listExistingTickets = responseDB.map((row) => row.ticket_code);

  console.log(listExistingTickets);

  if (!responseInfomaniak.ok) {
    res.json({ status: false, message: "Error fetching data from Infomaniak" });
  }

  const tickets = await responseInfomaniak.json();

  for (const ticket of tickets) {
    console.log("ticketimport:", ticket.barcode);
    const alreadyImported = listExistingTickets.includes(ticket.barcode);

    if (!alreadyImported) {
      const ticketData = {
        barcode: ticket.barcode,
        payementstatus: ticket.status,
        category: ticket.category_name,
        amount: ticket.amount,
        ordernumber: req.body.ordernumber,
      };
      const shopID = await Admin.insertTicket(eventid, ticketData);

      for (const survey of ticket.surveys) {
        for (const field of survey.fields) {
          const surveyData = {
            fieldname: field.name,
            fieldtype: field.type,
            fieldvalue: field.value,
          };
          await Admin.insertSurvey(shopID, surveyData);
        }
      }
    } else {
      const ticketData = {
        barcode: ticket.barcode,
        payementstatus: ticket.status,
        category: ticket.category_name,
        amount: ticket.amount,
        ordernumber: req.body.ordernumber,
      };

      const shopID = await Admin.updateTicket(ticketData);

      for (const survey of ticket.surveys) {
        for (const field of survey.fields) {
          const surveyData = {
            fieldname: field.name,
            fieldtype: field.type,
            fieldvalue: field.value,
          };
          await Admin.updateSurvey(shopID, surveyData);
        }
      }
    }
  }

  res.json({ status: true, message: "Got Some Shit", data: tickets });
};

export const updateEvent = async (req, res) => {
  const eventid = req.params.eventid;
  const data = {
    event_name: req.body.event_name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    street_name: req.body.street_name,
    street_number: req.body.street_number,
    city: req.body.city,
    zip: req.body.zip,
    shop_api_key: req.body.shop_api_key,
  };
  await Admin.updateEvent(eventid, data);

  res.json({ status: "success", message: "Event updated" });
};

export const updateEventGroup = async (req, res) => {
  const eventid = req.params.eventid;
  const groupid = req.params.groupid;
  const updateFields = {
    groupe: req.body.groupe,
    fk_parentgroupid: req.body.fk_parentgroupid,
  };

  console.log(updateFields);

  const response = await Admin.updateEventGroup(eventid, groupid, updateFields);

  res.json({ status: "success", data: response });
};

//DELETERS
export const deletePersonAlergen = async (req, res) => {
  const userid = req.params.userid;
  const allergenid = req.body.allergendid;

  await Admin.deletePersonAlergen(userid, allergenid);

  res.json({ status: true, message: "Allergen removed" });
};

export const deleteGroup = async (req, res) => {
  const eventid = req.params.eventid;
  const groupid = req.params.groupid;

  const haveChildren = await Admin.getGroupHaveChildren(eventid, groupid);

  const haveAttendee = await Admin.countAttendeeFromGroup(groupid);

  console.log(
    "Have Children: ",
    haveChildren,
    "- Have Attendee:",
    haveAttendee
  );

  if (haveChildren || haveAttendee) {
    return res
      .status(403)
      .json({
        error: "Forbidden",
        message: "Impossible de supprimer, l'élément à des enfants",
      });
  }

  const response = await Admin.deleteGroup(eventid, groupid);

  res.status(200).json({ status: "success", message: response });
};

export const deletePerson = async (req, res) => {
  const personid = req.params.personid;
  console.log(personid);
  const response = await Admin.deletePerson(personid);
  res.status(200).json({ status: "succes", message: response });
};
