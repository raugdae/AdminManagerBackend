import Admin from '../models/Admin.js';

// GETTERS
export const getAllEvents = async (req,res) => {
    const listEvent = await Admin.getAllEvents();
    res.json({success : true, count: listEvent.length,data:listEvent});
};

export const getAllAttendeeFromEvent = async(req,res) => {
    const eventid = req.params.eventid;
    const listAttendee = await Admin.getAllAttendeeFromEvent(eventid);
    res.json({success:true, count: listAttendee.length,data:listAttendee});
};

export const getCountOfAttendee = async (req,res) => {
    const eventid = req.params.eventid;
    const attendeeCount = await Admin.getCountOfAttendee(eventid);
    res.json({success:true, data:attendeeCount});
};

export const getAttendeeByGroup = async (req,res) => {
    const eventid = req.params.eventid;
    const groupid = req.params.groupid;

    const attendeeList = await Admin.getAttendeeByGroup(eventid,groupid);
    res.json({success:true,attendeeList});

}

export const getAllPerson = async (req,res) => {
    const personlist = await Admin.getAllPerson();
    res.json({success:true,personlist});
}

export const getAllergenList = async (req,res) =>{
    const allergenList = await Admin.getAllergenList();
    res.json({success:true,allergenList});
}

export const getPersonAllergens = async (req,res) =>{
    const personid = req.params.personid
    const personAllergenList = await Admin.getPersonAllergen(personid);
    res.json({success:true,personAllergenList});
}

// END GETTERS
// ADDERS
export const addNewGroup = async(req,res) => {
    const eventid = req.params.eventid;
    const groupname = req.body.groupname;
    const newgroupid = await Admin.addNewGroup(eventid,groupname);
    res.json({success:true,message:"group added"});
};

export const addNewChildGroup = async (req,res) =>{
    const childGroupData = req.body;
    const eventid = req.params.eventid;
    const newgroupid = await Admin.addNewChildGroup(eventid,childGroupData.parentgroupid,childGroupData.groupname);
    res.json({success:true,message:"New child group added"});
}

export const newEvent = async (req,res) => {
    const eventData = req.body;

    const eventCreated = await Admin.addNewEvent(eventData);
    res.json({success:true,eventCreated});
}

export const addAttendeeToGroup = async (req,res) =>{
    const data = req.body;
    const userAdded = await Admin.addAttendeeToGroup(data);


    if(userAdded.success === 'false'){
        console.log("Insert failed")
        if(userAdded.error == "DUPLICATE_ENTRY"){
            res.json({success:false,messsage:"User already in group"});
        }
        else{
        res.json({success:false,message:"Faild to add link"});
        }
    }else{
    res.json({success:true,message:"Attendee added to group"});
    }
}

export const addPerson = async (req,res) =>{
    const data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        iceName : req.body.iceName,
        iceDescription : req.body.iceDescription,
        iceNumber : req.body.iceNumber,
        city : req.body.city,
        zip : req.body.zip,
        strtName: req.body.streetName,
        strtNr : req.body.streetNumber,
        email : req.body.email,
        health : req.body.health,
        birthdate : req.body.birthdate,
        isVegetarian : req.body.isVegetarian
    }

    const personExists = await Admin.getPerson(data.firstName,data.lastName);

    console.log(personExists);

    if(personExists){
        res.json({success:false,message:"A person with this firstname and lastname already exist"});
    }
    const addedPerson = await Admin.addPerson(data);
    res.json({success:true,message:"User Added",addedPerson});
}

export const addAllergenToPerson = async (req,res) =>{

    
    console.log(req.body);
    const allergens = req.body.allergen;
    const personid = req.params.personid;

    

    const results = await Promise.all(
        allergens.map(allergenid => Admin.addAllergenToPerson(personid,allergenid))
    );

    if (results.success === 'false'){
        if(results.error === 'DUPLICATE_ENTRY'){
            res.json({success:false,message:"At least one entry already exist"});
        }
    }
    res.json({success:true,message:"Allergen registred",results});
}

//PUTTERS

export const updatePersonData = async (req,res) => {
    const data = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        iceName : req.body.iceName,
        iceDescription : req.body.iceDescription,
        iceNumber : req.body.iceNumber,
        city : req.body.city,
        zip : req.body.zip,
        strtName: req.body.streetName,
        strtNr : req.body.streetNumber,
        email : req.body.email,
        health : req.body.health,
        birthdate : req.body.birthdate,
        isVegetarian : req.body.isVegetarian
    }
    const personid = req.params.personid;
    const updatedPerson = await Admin.updatePersonData(personid,data);
    res.json({success:true,message:"user edited successfully"});
}

//DELETERS
