const NoteBook = require("../Model/NoteModel");

const getAllNote = async(req, res, next) =>  {
    let NoteRecords;

    try{
        NoteRecords = await NoteBook.find();
    }catch(err){
        console.log(err);
    }

    if(!NoteRecords){
        return res.status(404).json({message:"records not found"});
    };

    return res.status(200).json({NoteRecords})
};

const addNotes = async (req, res, next) => {

    const {title,description} = req.body;

    let NoteRecords;

    try{
        NoteRecords = new NoteBook({title,description});
        await NoteRecords.save();
    }catch(err){
        console.log(err);
    }

    if(!NoteRecords){
        return res.status(404).json({message:"unable to add Note records"});
    }
    return res.status(200).json({NoteRecords});
}

const getByNoteId = async (req, res, next) => {
    const id = req.params.id;

    let noteRecord;

    try{
        noteRecord = await NoteBook.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!noteRecord){
        return res.status(404).json({message:"Note record not found"});
    }
    return res.status(200).json({noteRecord});
}

const updateNote= async (req, res, next) => {

    const id = req.params.id;
    const {title,description} = req.body;

    let NoteRecords;

    try{
        NoteRecords = await NoteBook.findByIdAndUpdate(id,
        {title: title,description :description});
        NoteRecords = await NoteRecords.save();
    }
    catch(err){
        console.log(err);
    }
    if(!NoteRecords){
        return res.status(404).json({message:"unable to update Note "});
    }

    return res.status(200).json({NoteRecords}); 
}

const deleteNote = async (req, res, next) => {
    const id = req.params.id;

    let noteRecord;

    try{
         noteRecord = await NoteBook.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }

    if(!noteRecord){
        return res.status(404).json({message:"unable to delete Note "});
    }
    return res.status(200).json({noteRecord}); 
}

exports.getAllNote = getAllNote;
exports.addNotes = addNotes;
exports.getByNoteId = getByNoteId;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
