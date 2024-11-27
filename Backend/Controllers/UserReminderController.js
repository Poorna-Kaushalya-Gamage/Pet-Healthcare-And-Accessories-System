const userReminder = require("../Model/UserReminderModel");

const getAllReminder = async(req, res, next) => {
    let Reminders;
    //Get all reminders
    try{
        Reminders = await userReminder.find();
    }catch (err){
        console.log(err);
    } 
    //not found
    if(!Reminders){
        return res.status(404).json({message:"reminders not found"});
    }
     //Display all pet records
     return res.status(200).json({Reminders})
};

const addReminder = async (req, res, next) => {

    const {reminderMsg,remindAt} =req.body;

    let Reminders;

    try{
        Reminders = new userReminder({reminderMsg,remindAt});
        await Reminders.save();
    }catch(err){
        console.log(err);
    }

    if(!Reminders){
        return res.status(404).json({message:"unable to add reminders"});
    }
    return res.status(200).json({Reminders});
}

const getByReminderId = async (req, res, next) => {
    const id = req.params.id;

    let reminder;

    try{
        reminder = await userReminder.findById(id);
    }catch(err){
        console.log(err);
    }
    // not available User reminders    
    if(!reminder){
        return res.status(404).json({message:"User reminders not found"})
    }
    return res.status(200).json({reminder}); 
    
}  

const deleteReminder = async (req, res, next) => {
    const id = req.params.id;

    let reminder;

    try{
        reminder = await userReminder.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!reminder){
        return res.status(404).json({message:"unable to delete user reminder"});
    }
    return res.status(200).json({reminder});
}

exports.getAllReminder = getAllReminder;
exports.addReminder = addReminder;
exports.getByReminderId = getByReminderId;
exports.deleteReminder = deleteReminder;