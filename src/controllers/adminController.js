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
    const groupname = req.params.groupname;
    const newgroupid = await Admin.addNewGroup(eventid,groupname);
    res.json({success:true,message:"group added"});
};

export const addNewChildGroup = async (req,res) =>{
    const eventid = req.params.id;
    const groupname = req.params.groupname;
    const parentgroupid = req.params.parentgroupid;
    const newgroupid = await Admin.addNewChildGroup(eventid,parentgroupid,groupname);
    res.json({success:true,message:"New child group added"});
}
