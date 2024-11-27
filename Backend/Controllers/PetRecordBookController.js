const PetRecordBook = require("../Model/PetRecordBookModel");

const getAllPetRecordBooks = async(req, res, next) => {
    let PetRecordBooks;
    // Get all pet records
    try{
        PetRecordBooks = await PetRecordBook.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if(!PetRecordBooks){
        return res.status(404).json({message:"records not found"});
    }
    //Display all pet records
    return res.status(200).json({PetRecordBooks})
};

// data insert
const addPetHealthRecords = async (req, res, next) => {

    const {microchipId,date,diagnosis,treatment,specialNotes} = req.body;

    let PetRecordBooks;

    try{
        PetRecordBooks = new PetRecordBook({microchipId,date,diagnosis,treatment,specialNotes});
        await PetRecordBooks.save();
    }catch(err){
        console.log(err);
    }
    // not insert petrecordbooks
    if(!PetRecordBooks){
        return res.status(404).json({message:"unable to add pet health records"});
    }
    return res.status(200).json({PetRecordBooks});
}

const getById = async (req, res, next) => {
    const id = req.params.id;

    let petRecordBook;

    try{
        petRecordBook = await PetRecordBook.findById(id);
    }catch(err){
        console.log(err);
    }

    // not available petrecord
    if(!petRecordBook){
        return res.status(404).json({message:"Pet health record not found"});
    }
    return res.status(200).json({petRecordBook});
}

//update pet health record
const updateHealthRecord = async (req, res, next) => {

    const id = req.params.id;
    const {microchipId,date,diagnosis,treatment,specialNotes} = req.body;

    let PetRecordBooks;
   try{
         PetRecordBooks = await PetRecordBook.findByIdAndUpdate(id,
        {microchipId: microchipId,date: date,diagnosis: diagnosis,treatment: treatment,specialNotes: specialNotes});
        PetRecordBooks = await PetRecordBooks.save();  
    }catch(err){
        console.log(err);
    }     
    if(!PetRecordBooks){
        return res.status(404).json({message:"unable to update Pet health record "});
    }
    return res.status(200).json({PetRecordBooks});  
};

//Delete pet health report
const deleteHealthRecord = async (req, res, next) => {
    const id = req.params.id;

    let petRecordBook;

    try{
        petRecordBook = await PetRecordBook.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!petRecordBook){
        return res.status(404).json({message:"unable to delete Pet health record "});
    }
    return res.status(200).json({petRecordBook});  
};

const getPetRecordsByMicrochipId = async (req, res, next) => {
    const { microchipId } = req.params;
  
    try {
      const petRecordBook = await PetRecordBook.find({ microchipId: microchipId });
      if (!petRecordBook){
        return res.status(404).json({ message: "Pet Records not found" });
      }
      return res.status(200).json({ petRecordBook });
    } catch (error) {
      console.error("Error fetching do-warming records:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };


exports.getAllPetRecordBooks = getAllPetRecordBooks;
exports.addPetHealthRecords = addPetHealthRecords;
exports.getById = getById;
exports.updateHealthRecord = updateHealthRecord;
exports.deleteHealthRecord = deleteHealthRecord;
exports.getPetRecordsByMicrochipId = getPetRecordsByMicrochipId
