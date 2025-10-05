import Admin from '../models/Admin.js';

export const getAllEvents = async (req,res) => {
    const listEvent = await Admin.getAllEvents();
    console.log("in Controller : ",listEvent);
    res.json({success : true, count: listEvent.length,data:listEvent});
};

export const getAllAttendeeFromEvent = async(req,res) => {
    const eventid = req.params.id;
    const listAttendee = await Admin.getAllAttendeeFromEvent(eventid);
    res.json({success:true, count: listAttendee.length,data:listAttendee});
};

export const getCountOfAttendee = async (req,res) => {
    const eventid = req.params.id;
    const attendeeCount = await Admin.getCountOfAttendee(eventid);
    res.json({success:true, data:attendeeCount});
};

export const addNewGroup = async(req,res) => {
    const eventid = req.params.id;
    const groupname = req.body.groupname;
    const newgroupid = await Admin.addNewGroup(eventid,groupname);
    res.json({success:true,message:"group added"});
};

export const addNewChildGroup = async (req,res) =>{
    const childGroupData = req.body;
    const eventid = req.params.id;
    const newgroupid = await Admin.addNewChildGroup(eventid,childGroupData.parentgroupid,childGroupData.groupname);
    res.json({success:true,message:"New child group added"});
}

export const newEvent = async (req,res) => {
    const eventData = req.body;

    const eventCreated = await Admin.addNewEvent(eventData);
    res.json({success:true,eventCreated});
}

export const getAttendeeByGroup = async (req,res) => {
    const eventid = req.params.id;
    const groupid = req.params.groupid;

    const attendeeList = await Admin.getAttendeeByGroup(eventid,groupid);
    res.json({success:true,attendeeList});

}
