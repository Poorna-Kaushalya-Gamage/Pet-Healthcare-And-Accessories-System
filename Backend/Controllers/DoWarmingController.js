const doWarmingRecords = require("../Model/DoWarmingModel");

const getAllDoWarmingRecords = async (req, res, next) => {
    let DoWarmingData;

    try{
        DoWarmingData = await doWarmingRecords.find();
    }catch(err){
        console.log(err);
    }

    if(!DoWarmingData){
        return res.status(404).json({message:"records not found"});
    }
    return res.status(200).json({DoWarmingData})
};

const addDoWarmingRecords = async (req, res, next) =>{
    const {microchipId,date,treatment,nextDate} = req.body;
    
    let DoWarmingData;

    try{
         DoWarmingData = new doWarmingRecords({microchipId,date,treatment,nextDate});
         await DoWarmingData.save();
    }catch(err){
        console.log(err);
    }

    if(!DoWarmingData){
        return res.status(404).json({message:"unable to add do-warming records"});
    }
    return res.status(200).json({DoWarmingData});

}

const getByDoWarmingId = async (req, res, next) => {
    const id = req.params.id;

    let doWarmingData;

    try{
        doWarmingData = await doWarmingRecords.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!doWarmingData){
        return res.status(404).json({message:"Do-Warming record not found"});
    }
    return res.status(200).json({doWarmingData});
}

const updateDoWarmingRecord = async (req, res, next) =>{
    const id = req.params.id;
    const {microchipId,date,treatment,nextDate} = req.body;

    let DoWarmingData;

    try{
        DoWarmingData = await doWarmingRecords.findByIdAndUpdate(id,
        {microchipId: microchipId,date: date,treatment: treatment,nextDate: nextDate});
        DoWarmingData = await DoWarmingData.save();
    }catch(err){
        console.log(err);
    }
    if(!DoWarmingData){
        return res.status(404).json({message:"unable to update Do-Warming record "});
    }
    return res.status(200).json({DoWarmingData});  
}

const deleteDoWarmingRecord = async (req, res, next) => {
    const id = req.params.id;
    let doWarmingData;

    try{
        doWarmingData = await doWarmingRecords.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!doWarmingData){
        return res.status(404).json({message:"unable to dellete Do-Warming record "});
    }
    return res.status(200).json({doWarmingData}); 
}

const getDoWarmingRecordsByMicrochipId = async (req, res, next) => {
    const { microchipId } = req.params;
  
    try {
      const doWarmingData = await doWarmingRecords.find({ microchipId: microchipId });
      if (!doWarmingData){
        return res.status(404).json({ message: "Do-worming not found" });
      }
      return res.status(200).json({ doWarmingData });
    } catch (error) {
      console.error("Error fetching do-warming records:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.getAllDoWarmingRecords = getAllDoWarmingRecords;
exports.addDoWarmingRecords = addDoWarmingRecords;
exports.getByDoWarmingId = getByDoWarmingId;
exports.updateDoWarmingRecord = updateDoWarmingRecord;
exports.deleteDoWarmingRecord = deleteDoWarmingRecord;
exports.getDoWarmingRecordsByMicrochipId = getDoWarmingRecordsByMicrochipId;

