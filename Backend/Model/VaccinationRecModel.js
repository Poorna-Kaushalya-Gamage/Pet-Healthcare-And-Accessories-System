const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vaccineRecordSchema = new Schema({
  microchipId: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  date: {
    type: String,
    required: true,
  },
  Vaccine: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200,
  },
  nxtVaccination: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const currentDate = new Date(this.date);
        const nextVaccinationDate = new Date(value);
        return nextVaccinationDate > currentDate;
      },
      message: "Next Vaccination date must be after the Date.",
    },
  },
});

module.exports = mongoose.model("PetVaccinationRecords", vaccineRecordSchema);