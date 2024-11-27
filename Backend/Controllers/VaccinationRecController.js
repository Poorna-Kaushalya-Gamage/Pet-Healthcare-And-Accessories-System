const  VaccinationRecords = require("../Model/VaccinationRecModel");

const getAllVaccineRecords = async(req, res, next) =>{
    let VaccineData;

    try{
        VaccineData = await VaccinationRecords.find();
    }catch(err){
        console.log(err);
    }

    if(!VaccineData){
        return res.status(404).json({message:"records not found"});
    }
    return res.status(200).json({VaccineData})
}

const addVaccineRecords = async (req, res, next) =>{
    const {microchipId,date,Vaccine,nxtVaccination} = req.body;

    let VaccineData;

    try{
        VaccineData = new VaccinationRecords({microchipId,date,Vaccine,nxtVaccination});
        await VaccineData.save();
    }catch(err){
        console.log(err);
    }

    if(!VaccineData){
        return res.status(404).json({message:"unable to add vaccination records"});
    }
    return res.status(200).json({VaccineData});
}

const getByVaccinationId  = async (req, res , next) => {
    const id = req.params.id;

    let vaccineData;

    try{
        vaccineData = await VaccinationRecords.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!vaccineData){
        return res.status(404).json({message:"Vaccination record not found"});
    }
    return res.status(200).json({vaccineData});
}

const updateVaccinationRecord = async (req, res, next) =>{
    const id = req.params.id;
    const {microchipId,date,Vaccine,nxtVaccination} = req.body;

    let VaccineData;

    try{
        VaccineData = await VaccinationRecords.findByIdAndUpdate(id,
        {microchipId: microchipId,date: date,Vaccine: Vaccine,nxtVaccination: nxtVaccination});
        VaccineData = await vaccineData.save();
    }catch(err){
        console.log(err);
    }
    if(!VaccineData){
        return res.status(404).json({message:"unable to update vaccination record "});
    }
    return res.status(200).json({VaccineData});  
}

const deleteVaccinationRecord = async (req, res, next) => {
    const id = req.params.id;
    let vaccineData;

    try{
        vaccineData = await VaccinationRecords.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!vaccineData){
        return res.status(404).json({message:"unable to delete Vaccination record "});
    }
    return res.status(200).json({vaccineData}); 
}

const getVaccinationRecordsByMicrochipId = async (req, res, next) => {
    const { microchipId } = req.params;
  
    try {
      const vaccineData = await VaccinationRecords.find({ microchipId: microchipId });
      if (!vaccineData){
        return res.status(404).json({ message: "Vaccination Records not found" });
      }
      return res.status(200).json({ vaccineData });
    } catch (error) {
      console.error("Error fetching do-warming records:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.getAllVaccineRecords = getAllVaccineRecords;
exports.addVaccineRecords = addVaccineRecords;
exports.getByVaccinationId = getByVaccinationId;
exports.updateVaccinationRecord = updateVaccinationRecord;
exports.deleteVaccinationRecord = deleteVaccinationRecord;
exports.getVaccinationRecordsByMicrochipId = getVaccinationRecordsByMicrochipId