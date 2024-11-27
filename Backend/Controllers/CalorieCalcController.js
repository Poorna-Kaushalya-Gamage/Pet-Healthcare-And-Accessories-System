const calorieCalcRecords = require("../Model/CalorieCalcModel");

const getAllCaloriecalc = async (req, res, next) => {
    let CalorieCalcData;

    try{
        CalorieCalcData = await calorieCalcRecords.find();
    }catch(err){
        console.log(err);
    }

    if(!CalorieCalcData){
        return res.status(404).json({message:"records not found"});
    }
    return res.status(200).json({CalorieCalcData})
};

const addCaloriecalc = async (req, res, next) => {
    const { microchipId, date, activityType, weight, duration } = req.body;

    if (!microchipId || !date || !activityType || !weight || !duration) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    let metValue;
    let caloriesBurned;

    if (activityType.toLowerCase() === "walking") {
        metValue = 50;
    } else if (activityType.toLowerCase() === "running") {
        metValue = 100;
    } else {
        return res.status(400).json({ message: "Invalid activity type" });
    }

    // Calculate calories burned based on MET value, weight, and duration
    caloriesBurned = metValue * weight * (duration / 60); // Duration is assumed to be in minutes

    const newRecord = new calorieCalcRecords({
        microchipId,
        date,
        activityType,
        weight,
        duration,
        caloriesBurned // Include calculated caloriesBurned in the new record
    });

    try {
        // Save the new record to the database
        await newRecord.save();
        return res.status(201).json({ message: "Record added successfully", newRecord });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add record" });
    }
};

const getByCaloriecalcId = async (req, res, next) => {
    const id = req.params.id;

    let calorieCalcData;

    try{
        calorieCalcData = await calorieCalcRecords.findById(id);
    }catch(err){
        console.log(err);
    }

    if(!calorieCalcData){
        return res.status(404).json({message:"Calorie calculator record not found"});
    }
    return res.status(200).json({calorieCalcData});
}

const updateCaloriecalcRecord = async (req, res, next) => {
    const id = req.params.id;
    const { microchipId, date, activityType, weight, duration } = req.body;

    try {
        // Find the record by ID
        let calorieCalcData = await calorieCalcRecords.findById(id);

        if (!calorieCalcData) {
            return res.status(404).json({ message: "Calorie calculator record not found" });
        }

        // Update the record with the new values
        calorieCalcData.microchipId = microchipId;
        calorieCalcData.date = date;
        calorieCalcData.activityType = activityType;
        calorieCalcData.weight = weight;
        calorieCalcData.duration = duration;

        // Recalculate caloriesBurned based on updated data
        let metValue;
        if (activityType.toLowerCase() === "walking") {
            metValue = 50;
        } else if (activityType.toLowerCase() === "running") {
            metValue = 100;
        } else {
            return res.status(400).json({ message: "Invalid activity type" });
        }

        calorieCalcData.caloriesBurned = metValue * weight * (duration / 60);

        // Save the updated record back to the database
        await calorieCalcData.save();

        return res.status(200).json({ calorieCalcData });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update calorie calculator record" });
    }
};


const deleteCaloriecalcRecord = async (req, res, next) => {
    const id = req.params.id;
    let calorieCalcData;

    try{
        calorieCalcData = await calorieCalcRecords.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
    if(!calorieCalcData){
        return res.status(404).json({message:"unable to delete calorie calculator record "});
    }
    return res.status(200).json({calorieCalcData}); 
}

const getCaloriecalcRecordsByMicrochipId = async (req, res, next) => {
    const { microchipId } = req.params;
  
    try {
      const calorieCalcData = await calorieCalcRecords.find({ microchipId: microchipId });
      if (!calorieCalcData){
        return res.status(404).json({ message: "Calorie records not found" });
      }
      return res.status(200).json({ calorieCalcData });
    } catch (error) {
      console.error("Error fetching Calorie records:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

exports.getAllCaloriecalc = getAllCaloriecalc;
exports.addCaloriecalc = addCaloriecalc;
exports.getByCaloriecalcId = getByCaloriecalcId;
exports.updateCaloriecalcRecord = updateCaloriecalcRecord;
exports.deleteCaloriecalcRecord = deleteCaloriecalcRecord;
exports.getCaloriecalcRecordsByMicrochipId = getCaloriecalcRecordsByMicrochipId;

